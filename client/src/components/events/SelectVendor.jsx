import React, { useState } from "react";
import { HiExternalLink } from "react-icons/hi";
// import Header and EventNavbar if you want to use them in this page
// import Header from "../Header";
// import EventNavbar from "./EventNavbar";

const neonColor = "#3b82f6";

const vendors = [
  {
    id: 1,
    name: "Vendor A",
    description: "Trusted electronics supplier.",
    imageUrl: "https://via.placeholder.com/200x150?text=Vendor+A",
  },
  {
    id: 2,
    name: "Vendor B",
    description: "High-quality furniture vendor.",
    imageUrl: "https://via.placeholder.com/200x150?text=Vendor+B",
  },
  {
    id: 3,
    name: "Vendor C",
    description: "Top-rated clothing supplier.",
    imageUrl: "https://via.placeholder.com/200x150?text=Vendor+C",
  },
];

function SelectVendor() {
  const [hoveredId, setHoveredId] = useState(null);

  const handleSelect = (id) => {
    alert(`Selected Vendor ID: ${id}`);
  };

  return (
    <div className="w-full min-h-screen bg-[#161B22] font-sans text-white selection:bg-gray-600 selection:text-gray-200">
      <main className="flex-grow pr-12 pl-12 pb-12 pt-4 max-w-7xl mx-auto">
        <h1
          className="text-4xl font-extrabold text-gray-200 mb-12 border-b border-gray-700 pb-3 select-none tracking-wide"
          style={{ userSelect: "none" }}
        >
          Select Vendors
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 20,
          }}
        >
          {vendors.map((vendor) => {
            const isHovered = hoveredId === vendor.id;

            return (
              <div
                key={vendor.id}
                onMouseEnter={() => setHoveredId(vendor.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  border: `1px solid ${isHovered ? neonColor : "#30363d"}`,
                  borderRadius: 16,
                  padding: 16,
                  textAlign: "center",
                  boxShadow: isHovered
                    ? `0 0 10px 2px ${neonColor}`
                    : "0 2px 8px rgba(0,0,0,0.3)",
                  backgroundColor: "#0d1117",
                  color: "#eee",
                  cursor: "pointer",
                  transform: isHovered ? "scale(1.05)" : "scale(1)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={vendor.imageUrl.replace(/\?.*$/, "")} // removes placeholder text overlay
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginBottom: 12,
                    border: `3px solid ${neonColor}`,
                    boxShadow: isHovered ? `0 0 8px ${neonColor}` : "none",
                    transition: "box-shadow 0.3s ease",
                  }}
                />
                <h3
                  style={{
                    margin: "8px 0",
                    fontWeight: "700",
                    fontSize: "1.25rem",
                  }}
                >
                  {vendor.name}
                </h3>
                <p style={{ color: "#bbb", marginBottom: 16 }}>
                  {vendor.description}
                </p>
                <button
                  onClick={() => handleSelect(vendor.id)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "rgba(255 255 255 / 0.1)",
                    color: "#fff",
                    border: "1px solid rgba(255 255 255 / 0.2)",
                    borderRadius: 8,
                    cursor: "pointer",
                    backdropFilter: "blur(6px)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontWeight: "600",
                    fontSize: "0.9rem",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(255 255 255 / 0.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(255 255 255 / 0.1)")
                  }
                >
                  Select <HiExternalLink size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default SelectVendor;
