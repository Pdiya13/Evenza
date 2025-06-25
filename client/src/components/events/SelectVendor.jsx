import React, { useState, useEffect } from "react";
import { HiExternalLink } from "react-icons/hi";
import axios from "axios";
import { useParams } from "react-router-dom";

function SelectVendor() {
  const { id: eventId } = useParams(); // Extract eventId from URL
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVendors() {
      try {
        const res = await axios.get("http://localhost:8080/api/user/select-vendor", {
          headers: {
            Authorization: localStorage.getItem("token"), // If isLoggedIn middleware is still used
          }
        });
        setVendors(res.data.availableVendors);
      } catch (error) {
        console.error("Failed to fetch vendors:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVendors();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#161B22] font-sans text-white">
      <main className="flex-grow px-12 py-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-200 mb-12 border-b border-gray-700 pb-3">
          Vendor List for Event ID: {eventId}
        </h1>

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
                  className="px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white font-semibold flex items-center gap-2 hover:bg-white/20"
                  disabled
                >
                  View Details <HiExternalLink size={18} />
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
