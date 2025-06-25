import React, { useEffect, useState } from "react";
import { HiExternalLink } from "react-icons/hi";
import axios from "axios";

const neonColor = "#3b82f6";

const VendorCard = ({ name, description, email, logo }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group overflow-hidden flex flex-col items-center p-6 rounded-xl bg-[#0d1117] border border-[#30363d] transition-transform duration-300 transform ${isHovered ? "scale-105" : ""
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

      {logo ? (
        <img
          src={logo}
          alt={`${name} logo`}
          className="relative z-10 w-20 h-20 rounded-full shadow-lg"
          style={{ border: `3px solid ${neonColor}` }}
        />
      ) : (
        <div
          className="relative z-10 w-20 h-20 rounded-full bg-gray-700 text-white flex items-center justify-center text-lg font-semibold"
          style={{ border: `3px solid ${neonColor}` }}
        >
          No Logo
        </div>
      )}

      <h3 className="relative z-10 mt-4 text-xl font-bold text-white tracking-wide">
        {name}
      </h3>

      <p className="relative z-10 text-sm text-gray-400 mt-2 text-center">
        {description}
      </p>

      <p className="relative z-10 text-xs text-gray-500 mt-1 mb-4">{email}</p>

      <button className="relative z-10 mt-auto py-2 px-6 rounded-md text-sm font-semibold text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition duration-300 flex items-center gap-2">
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
          {vendorList.map((vendor, index) => (
            <VendorCard key={index} {...vendor} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Vendors;
