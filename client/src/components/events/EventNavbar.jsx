import React from 'react';
import {
  FaStore,           // for Select Vendor
  FaClipboardList,   // for Smart Checklist
  FaDollarSign,      // for Budget Management
  FaUsers,           // for Guest Management
  FaArrowLeft,       // for Back
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function EventNavbar() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-[#0D1117] p-6 w-24 hover:w-64 transition-width duration-300 group relative overflow-y-auto">

      {/* Title - collapsed by default, expands on hover */}
      <div
        className="font-bold text-2xl font-lexend-giga-custom text-[#C3D0E5] mb-10 select-none
                   max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300"
        style={{ pointerEvents: 'none' }}
      >
        EVENZA
      </div>

      <div className="w-full mt-20">
        <ul className="text-white flex flex-col justify-start gap-10 text-base font-normal">
          {/* Each nav item */}
          {[
            { icon: <FaStore />, label: 'Select Vendor', path: '/select-vendor' },
            { icon: <FaClipboardList />, label: 'Smart Checklist', path: '/checklist' },
            { icon: <FaDollarSign />, label: 'Budget Management', path: '/budget' },
            { icon: <FaUsers />, label: 'Guest Management', path: '/guests' },
            { icon: <FaArrowLeft />, label: 'Back', path : '/dashboard' },
          ].map(({ icon, label, path, action }) => (
            <li
              key={label}
              className="hover:bg-[#F4F4F4] px-3 py-2 rounded-md hover:text-[#0D1117] flex items-center gap-4 cursor-pointer transition-colors duration-200"
              onClick={action ? action : () => navigate(path)}
            >
              <div className="min-w-[20px] text-xl">{icon}</div>
              <span
                className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300"
                style={{ display: 'inline-block' }}
              >
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EventNavbar;
