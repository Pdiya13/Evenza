import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function SelectVendor() {
  const { id: eventId } = useParams(); // Event ID from URL
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // For redirection
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:8080/api/user/select-vendor", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        setVendors(res.data.availableVendors);
        setQueries(res.data.vendorQueries);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);


  return (
    <div className="w-full min-h-screen bg-[#161B22] font-sans text-white">
      <main className="flex-grow px-12 py-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-200 mb-12 border-b border-gray-700 pb-3">
          Vendor List for Event ID: {eventId}
        </h1>
        <h2 className="text-3xl font-bold mt-16 mb-6">Your Vendor Queries</h2>

        {queries.length === 0 ? (
          <p className="text-gray-400">You haven't submitted any queries yet.</p>
        ) : (
          <ul className="space-y-4">
            {queries.map((query) => (
              <li
                key={query._id}
                className="p-4 rounded-lg border border-gray-700 bg-[#0d1117]"
              >
                <h4 className="text-lg font-semibold mb-1">
                  Vendor: <span className="text-blue-400">{query.vendorId.name}</span>
                </h4>
                <p className="text-gray-400">
                  Event: {query.eventId?.title || "Untitled"} | Budget: ₹{query.budget} | Date: {new Date(query.eventDate).toLocaleDateString()}
                </p>
                <p className="mt-1 font-semibold">
                  Status:{" "}
                  <span
                    className={`${query.status === "pending"
                      ? "text-yellow-400"
                      : query.status === "accepted"
                        ? "text-green-400"
                        : "text-red-400"
                      }`}
                  >
                    {query.status.toUpperCase()}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        )}

        {loading ? (
          <p className="text-gray-400">Loading vendors...</p>
        ) : vendors.length === 0 ? (
          <p className="text-red-400">No vendors available.</p>
        ) : (
          <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
            {vendors.map((vendor) => (
              <div
                key={vendor._id}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-[#0d1117] border border-[#30363d] shadow-md"
              >
                <h3 className="text-xl font-bold mb-2">{vendor.name}</h3>
                <p className="text-gray-400 mb-1 font-semibold">
                  Category: <span className="text-[#3b82f6]">{vendor.category}</span>
                </p>
                <p className="text-gray-400 mb-1 font-semibold">
                  Price: <span className="text-[#3b82f6]">{vendor.price}</span>
                </p>
                <p className="text-gray-400 mb-3">{vendor.description}</p>

                <button
                  className="px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white font-semibold flex items-center gap-2 hover:bg-blue-600 transition"
                  onClick={() => navigate(`/event/${eventId}/vendor/${vendor._id}/query`)}
                >
                  Query Vendor
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default SelectVendor;
