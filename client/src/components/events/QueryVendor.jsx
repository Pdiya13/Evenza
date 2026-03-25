import axios from 'axios';
import React, { useState, useEffect } from 'react';
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

  const token = localStorage.getItem("token");

  //FETCH EVENT DATE
  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/event/${eventId}`,
        { headers: { Authorization: token } }
      );

      const event = res.data.event;

      setQueryData((prev) => ({
        ...prev,
        eventDate: event.date,
      }));

    } catch (err) {
      console.log(err);
    }
  };

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

    const data = {
      eventId,
      vendorId,
      eventDate: queryData.eventDate,
      budget: queryData.budget,
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/user/query-vendor",
        data,
        { headers: { Authorization: token } }
      );

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
    <div className="min-h-screen bg-[#161B22] px-4 py-10 text-white">
      <div className="max-w-2xl mx-auto">

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-2">
            Submit Query to Vendor
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#0D1117] p-8 rounded-xl border border-[#30363d] space-y-6 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
        >

          {/* EVENT DATE (LOCKED) */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">
                Event Date
            </label>

            <div className="w-full px-4 py-2 rounded bg-[#1c1f26] border border-gray-600 text-white">
              {queryData.eventDate
                  ? (() => {
                      const d = new Date(queryData.eventDate);
                      const day = String(d.getDate()).padStart(2, "0");
                      const month = String(d.getMonth() + 1).padStart(2, "0");
                      const year = d.getFullYear();
                      return `${day}/${month}/${year}`;
                  })()
                  : "Loading..."}
            </div>
          </div>

          {/* BUDGET */}
          <div>
            <label className="text-gray-400 text-sm mb-1 block">
              Budget (₹)
            </label>

              <input
                  name="budget"
                  type="number"
                  value={queryData.budget}
                  onChange={handleChange}
                  placeholder="Enter your budget"
                  className="w-full px-4 py-2 rounded bg-[#1c1f26] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
              />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded font-semibold transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit Query"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default QueryVendor;