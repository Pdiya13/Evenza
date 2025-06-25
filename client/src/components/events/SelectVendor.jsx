import React, { useState, useEffect } from "react";
import { HiExternalLink } from "react-icons/hi";
import axios from "axios";
import { useParams } from "react-router-dom"; // <-- add this

function SelectVendor() {
  const { id: eventId } = useParams(); // <-- get event ID from URL
  const [vendors, setVendors] = useState([]);
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [budget, setBudget] = useState("");
  const [eventDate, setEventDate] = useState("");

  useEffect(() => {
    async function fetchdata() {
      try {
        const res = await axios.get("http://localhost:8080/api/user/select-vendor", {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        });
        setVendors(res.data.availableVendors);
      } catch (err) {
        console.log(err);
      }
    }
    fetchdata();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/user/select-vendor`,
        {
          vendorId: selectedVendorId,
          budget,
          eventDate,
          eventId // <-- now eventId is included in request
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        }
      );
      alert("Vendor selected successfully!");
      console.log(res.data);
      setSelectedVendorId(null);
      setBudget("");
      setEventDate("");
    } catch (err) {
      console.error(err);
      alert("Failed to select vendor");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#161B22] font-sans text-white">
      <main className="flex-grow px-12 py-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-200 mb-12 border-b border-gray-700 pb-3">
          Select Vendors for Event ID: {eventId}
        </h1>

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
              <p className="text-gray-400 mb-3 font-semibold">
                Price: <span className="text-[#3b82f6]">{vendor.price}</span>
              </p>

              <button
                onClick={() => setSelectedVendorId(vendor._id)}
                className="px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white font-semibold flex items-center gap-2 hover:bg-white/20"
              >
                Select <HiExternalLink size={18} />
              </button>

              {selectedVendorId === vendor._id && (
                <div className="mt-4 w-full flex flex-col gap-2">
                  <input
                    type="number"
                    placeholder="Enter Budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="px-3 py-2 rounded bg-[#1c1f26] border border-gray-600 text-white"
                  />
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="px-3 py-2 rounded bg-[#1c1f26] border border-gray-600 text-white"
                  />
                  <button
                    onClick={handleSubmit}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Confirm Selection
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default SelectVendor;
