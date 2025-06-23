import React from 'react';
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaMoneyCheckAlt,
  FaStar,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function VendorNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('Logging out...');
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-[#0D1117] p-6 w-24 hover:w-64 transition-width duration-300 group relative overflow-y-auto">
      <div
        className="font-bold text-2xl font-lexend-giga-custom text-[#C3D0E5] mb-10 select-none
                   max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300"
        style={{ pointerEvents: 'none' }}
      >
        EVENZA
      </div>

      <div className="w-full mt-20">
        <ul className="text-white flex flex-col justify-start gap-10 text-base font-normal">

          {/* Dashboard */}
          <li
            className="hover:bg-[#F4F4F4] px-3 py-2 rounded-md hover:text-[#0D1117] flex items-center gap-4 cursor-pointer transition-colors duration-200"
            onClick={() => navigate('/vendor-dashboard')}
          >
            <div className="min-w-[20px] text-xl"><FaTachometerAlt /></div>
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300" style={{ display: 'inline-block' }}>
              Dashboard
            </span>
          </li>

          {/* Event List */}
          <li
            className="hover:bg-[#F4F4F4] px-3 py-2 rounded-md hover:text-[#0D1117] flex items-center gap-4 cursor-pointer transition-colors duration-200"
            onClick={() => navigate('/eventslist')}
          >
            <div className="min-w-[20px] text-xl"><FaCalendarAlt /></div>
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300" style={{ display: 'inline-block' }}>
              Event List
            </span>
          </li>

          {/* Payments */}
          <li
            className="hover:bg-[#F4F4F4] px-3 py-2 rounded-md hover:text-[#0D1117] flex items-center gap-4 cursor-pointer transition-colors duration-200"
            onClick={() => navigate('/payments')}
          >
            <div className="min-w-[20px] text-xl"><FaMoneyCheckAlt /></div>
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300" style={{ display: 'inline-block' }}>
              Payments
            </span>
          </li>

          {/* Ratings */}
          <li
            className="hover:bg-[#F4F4F4] px-3 py-2 rounded-md hover:text-[#0D1117] flex items-center gap-4 cursor-pointer transition-colors duration-200"
            onClick={() => navigate('/ratings')}
          >
            <div className="min-w-[20px] text-xl"><FaStar /></div>
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300" style={{ display: 'inline-block' }}>
              Ratings
            </span>
          </li>

          {/* Logout */}
          <li
            className="hover:bg-[#F4F4F4] px-3 py-2 rounded-md hover:text-[#0D1117] flex items-center gap-4 cursor-pointer transition-colors duration-200"
            onClick={handleLogout}
          >
            <div className="min-w-[20px] text-xl"><FaSignOutAlt /></div>
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300" style={{ display: 'inline-block' }}>
              Logout
            </span>
          </li>

        </ul>
      </div>
    </div>
  );
}

export default VendorNavbar;
