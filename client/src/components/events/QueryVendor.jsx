import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function QueryVendor() {
  const { eventId, vendorId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [queryData, setQueryData] = useState({
    eventDate: '',
    budget: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQueryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    const data = {
      eventId,
      vendorId,
      eventDate: queryData.eventDate,
      budget: queryData.budget,
    };

    try {
      const res = await axios.post("http://localhost:8080/api/user/query-vendor", data, {
        headers: { Authorization: token },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/manage/${eventId}/select-vendor`);
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Query Vendor Error:", error);
      toast.error("Failed to submit vendor query");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#161B22] px-4 py-10 text-white font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-gray-200 mb-2">
            Submit Query to Vendor
          </h1>
          <p className="text-gray-400 text-sm">
            Event ID: <span className="text-blue-400">{eventId}</span> &nbsp;|&nbsp; 
            Vendor ID: <span className="text-blue-400">{vendorId}</span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#0D1117] p-8 rounded-lg shadow-lg border border-[#30363d] space-y-6"
        >
          <div className="flex flex-col">
            <label htmlFor="eventDate" className="mb-1 text-sm text-gray-400">
              Event Date
            </label>
            <input
              name="eventDate"
              type="date"
              value={queryData.eventDate}
              onChange={handleChange}
              className="px-4 py-2 rounded bg-[#1c1f26] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="budget" className="mb-1 text-sm text-gray-400">
              Budget (in ₹)
            </label>
            <input
              name="budget"
              type="number"
              value={queryData.budget}
              onChange={handleChange}
              placeholder="Enter your budget"
              className="px-4 py-2 rounded bg-[#1c1f26] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded font-semibold transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default QueryVendor;
