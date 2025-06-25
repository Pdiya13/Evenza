import React, { useEffect, useState } from "react";
import { HiExternalLink } from "react-icons/hi";
import axios from "axios";

const neonColor = "#3b82f6";

const VendorCard = ({ name, category, price, experience }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group overflow-hidden flex flex-col items-center p-6 rounded-xl bg-[#0d1117] border border-[#30363d] transition-transform duration-300 transform ${
        isHovered ? "scale-105" : ""
      } shadow-md`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: "pointer",
        boxShadow: isHovered
          ? `0 0px 8px 1px ${neonColor}`
          : "0 2px 8px rgba(0,0,0,0.6)",
      }}
    >
      <div className="absolute inset-0 rounded-xl z-0 border-1 border-transparent group-hover:border-blue-300 transition duration-300 blur-sm"></div>

      <div
        className="relative z-10 w-20 h-20 rounded-full bg-gray-700 text-white flex items-center justify-center text-3xl font-bold"
        style={{ border: `3px solid ${neonColor}` }}
      >
        {name?.charAt(0).toUpperCase() || "V"}
      </div>

      <h3 className="relative z-10 mt-4 text-xl font-bold text-white tracking-wide text-center">
        {name}
      </h3>

      <p className="relative z-10 text-sm text-gray-400 mt-2">
        <strong>Category:</strong> {category}
      </p>

      <p className="relative z-10 text-sm text-gray-400">
        <strong>Price:</strong> ₹{price}
      </p>

      <p className="relative z-10 text-sm text-gray-400">
        <strong>Experience:</strong> {experience} {experience === 1 ? "year" : "years"}
      </p>

      <button className="relative z-10 mt-4 py-2 px-6 rounded-md text-sm font-semibold text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition duration-300 flex items-center gap-2">
        View Details <HiExternalLink size={18} />
      </button>
    </div>
  );
};

function Vendors() {
  const [vendorList, setVendorList] = useState([]);

  useEffect(() => {
    async function fetchVendors() {
      try {
        const res = await axios.get("http://localhost:8080/api/user/select-vendor", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setVendorList(res.data.availableVendors);
      } catch (error) {
        console.error("Failed to fetch vendors:", error);
      }
    }

    fetchVendors();
  }, []);

  return (
    <div className="w-full font-poppins-custom min-h-screen bg-[#161B22] text-white selection:bg-gray-600 selection:text-gray-200">
      <main className="flex-grow pr-12 pl-12 pb-12 pt-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-200 mb-12 border-b border-gray-700 pb-3 select-none tracking-wide">
          Our Vendors
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
          {vendorList.length > 0 ? (
            vendorList.map((vendor, index) => (
              <VendorCard key={index} {...vendor} />
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full">No vendors found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Vendors;
