import React from 'react';
import {
  FaStore,
  FaClipboardList,
  FaDollarSign,
  FaUsers,
  FaArrowLeft,
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

function EventNavbar() {
  const navigate = useNavigate();
  const { id: eventId } = useParams(); // get the event ID from URL

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-[#0D1117] p-6 w-24 hover:w-64 transition-width duration-300 group relative overflow-y-auto">
      {/* Title */}
      <div
        className="font-bold text-2xl font-lexend-giga-custom text-[#C3D0E5] mb-10 select-none
                   max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300"
        style={{ pointerEvents: 'none' }}
      >
        EVENZA
      </div>

      <div className="w-full mt-20">
        <ul className="text-white flex flex-col justify-start gap-10 text-base font-normal">
          {[
            { icon: <FaStore />, label: 'Select Vendor', path: `/manage/${eventId}/select-vendor` },
            { icon: <FaClipboardList />, label: 'Smart Checklist', path: `/manage/${eventId}/checklist` },
            { icon: <FaDollarSign />, label: 'Budget Management', path: `/manage/${eventId}/budget` },
            { icon: <FaUsers />, label: 'Guest Management', path: `/manage/${eventId}/guests` },
            { icon: <FaArrowLeft />, label: 'Back', path: '/dashboard' },
          ].map(({ icon, label, path }) => (
            <li
              key={label}
              className="hover:bg-[#F4F4F4] px-3 py-2 rounded-md hover:text-[#0D1117] flex items-center gap-4 cursor-pointer transition-colors duration-200"
              onClick={() => navigate(path)}
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
