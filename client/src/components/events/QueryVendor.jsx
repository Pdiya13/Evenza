import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function QueryVendor() {
    const { eventId, vendorId } = useParams();
    const navigate = useNavigate();
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

  const token = localStorage.getItem("token");

  const data = {
        eventId : eventId,
        vendorId : vendorId,
        eventDate : queryData.eventDate,
        budget : queryData.budget
    };

  try {
    const res = await axios.post("http://localhost:8080/api/user/query-vendor", data, {
      headers: {
        Authorization: token,
      },
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
  }
};


  return (
    <div>
    <div className="min-h-screen bg-[#161B22] flex items-center justify-center px-4">
         
      <form
        className="w-full max-w-md bg-[#0D1117] p-8 rounded-lg shadow-lg border border-[#30363d] text-white space-y-6 font-poppins-custom"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-100">Query Vendor</h2>

        <div className="flex flex-col">
          <label htmlFor="eventDate" className="mb-1 text-sm text-gray-400">
            Event Date
          </label>
          <input
            name="eventDate"
            type="date"
            value={queryData.eventDate}
            onChange={handleChange}
            className="px-4 py-2 rounded bg-[#1c1f26] border border-gray-600 text-white focus:outline-none focus:border-blue-500"
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
            className="px-4 py-2 rounded bg-[#1c1f26] border border-gray-600 text-white focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded text-white font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
}

export default QueryVendor;
