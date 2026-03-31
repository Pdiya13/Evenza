import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

function VendorQueries() {
  const [queries, setQueries] = useState([]);
  const [filter, setFilter] = useState("3months");

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const vendorId = decoded.id;

      const res = await axios.get(
        `http://localhost:8080/api/vendor/${vendorId}/payments`,
        {
          headers: { Authorization: token },
        }
      );

      setQueries(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch queries");
    }
  };

  const handleAction = async (id, status) => {
    try {
      await axios.post(
        `http://localhost:8080/api/vendor/payments/${id}`,
        { status }
      );

      setQueries(prev =>
        prev.map(q =>
          q._id === id ? { ...q, status } : q
        )
      );

      toast.success(`Query ${status}`);
    } catch (err) {
      toast.error("Action failed");
    }
  };

  // 🔥 MAIN PROCESS LOGIC (FILTER + EXPIRE + SORT)
    const processData = (data) => {
    const today = new Date();

    // 🔥 normalize today (remove time)
    today.setHours(0, 0, 0, 0);

    return data
        .map(q => {
        if (q.status === "Pending" && q.eventId?.date) {

            const eventDate = new Date(q.eventId.date);

            // 🔥 normalize event date
            eventDate.setHours(0, 0, 0, 0);

            // ✅ expire ONLY if event date is BEFORE today
            if (eventDate < today) {
            return { ...q, status: "Expired" };
            }
        }

        return q;
        })
        .filter(q => {
        if (filter === "all") return true;
        if (!q.eventId?.date) return false;

        const eventDate = new Date(q.eventId.date);

        if (filter === "3months") {
            const d = new Date();
            d.setMonth(d.getMonth() - 3);
            return eventDate >= d;
        }

        if (filter === "6months") {
            const d = new Date();
            d.setMonth(d.getMonth() - 6);
            return eventDate >= d;
        }

        return true;
        })
        .sort((a, b) => {
        const dateA = new Date(a.eventId?.date || 0);
        const dateB = new Date(b.eventId?.date || 0);
        return dateB - dateA;
        });
    };

  const processedData = processData(queries);

  const pending = processedData.filter(q => q.status === "Pending");
  const processed = processedData.filter(q => q.status !== "Pending");

  const renderRow = (q, showActions = false) => (
    <tr key={q._id} className="border-t border-gray-800 hover:bg-white/5 transition">
      <td className="px-6 py-3">{q.userId?.name || "N/A"}</td>
      <td className="px-6 py-3">{q.eventId?.ename || "Event Deleted"}</td>
      <td className="px-6 py-3">
        {q.eventId?.date
          ? new Date(q.eventId.date).toLocaleDateString()
          : "N/A"}
      </td>
      <td className="px-6 py-3 text-amber-200 font-semibold">
        ₹{q.budget?.toLocaleString()}
      </td>

      <td className="px-6 py-3">
        <span
          className={`px-3 py-1 text-xs rounded-full font-semibold ${
            q.status === "Accepted"
              ? "bg-green-500/20 text-green-300 border border-green-500/30"
              : q.status === "Rejected"
              ? "bg-red-500/20 text-red-300 border border-red-500/30"
              : q.status === "Expired"
              ? "bg-gray-500/20 text-gray-300 border border-gray-500/30"
              : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
          }`}
        >
          {q.status}
        </span>
      </td>

      {showActions && q.status === "Pending" && (
        <td className="px-6 py-3 space-x-2">
          <button
            onClick={() => handleAction(q._id, "Accepted")}
            className="px-3 py-1 text-xs bg-green-600 hover:bg-green-700 rounded"
          >
            Accept
          </button>
          <button
            onClick={() => handleAction(q._id, "Rejected")}
            className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 rounded"
          >
            Reject
          </button>
        </td>
      )}
    </tr>
  );

  const renderTable = (data, showActions = false) => (
    <div className="overflow-x-auto bg-[#0D1117] rounded-xl border border-gray-700 mb-8 shadow-lg">
      <table className="min-w-full text-sm">
        <thead className="text-gray-400 bg-[#161B22] uppercase tracking-wide">
          <tr>
            <th className="px-6 py-4">User</th>
            <th className="px-6 py-4">Event</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Budget</th>
            <th className="px-6 py-4">Status</th>
            {showActions && <th className="px-6 py-4">Action</th>}
          </tr>
        </thead>

        <tbody>
          {data.map(q => renderRow(q, showActions))}

          {data.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-400">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-8 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Vendor Queries
      </h1>

      {/* 🔶 PENDING */}
      <div className="mb-12">
        <h2 className="text-xl text-yellow-400 mb-3 font-semibold">
          Pending Queries
        </h2>
        {renderTable(pending, true)}
      </div>

      {/* 🔷 PROCESSED */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl text-blue-400 font-semibold">
            Accepted / Rejected / Expired
          </h2>

          {/* 🔥 DROPDOWN MOVED HERE */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[#0D1117] border border-gray-600 text-white px-3 py-2 rounded"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="all">All Time</option>
          </select>
        </div>

        {renderTable(processed, false)}
      </div>

    </div>
  );
}

export default VendorQueries;