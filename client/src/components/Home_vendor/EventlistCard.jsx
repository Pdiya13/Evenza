import React from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaTag, FaClipboardList, FaUser,
  FaPhoneAlt, } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function EventlistCard({ event }) {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full max-w-sm p-6 rounded-3xl bg-white/10 backdrop-blur-md
                 border border-white/20 shadow-xl transition-transform hover:scale-[1.03] hover:shadow-2xl
                 text-white flex flex-col"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <h3 className="text-3xl font-extrabold mb-4 tracking-wide drop-shadow-lg">{event.ename}</h3>

       <p className="flex items-center text-sm mb-2 text-gray-300">
        <FaUser className="mr-2 text-blue-400" /> {event.userName || 'Users name'}
      </p>

      <p className="flex items-center text-sm mb-2 text-gray-300">
        <FaPhoneAlt className="mr-2 text-green-400" /> {event.mobile || 'Users number'}
      </p>

      <p className="flex items-center text-sm mb-2 text-blue-300">
        <FaMapMarkerAlt className="mr-2" /> {event.location}
      </p>

      <p className="flex items-center text-sm mb-2 text-purple-300">
        <FaCalendarAlt className="mr-2" /> {event.date}
      </p>

      <p className="flex items-center text-sm text-pink-300">
        <FaTag className="mr-2" /> {event.type}
      </p>

      <div className="mt-auto pt-6">
        <button
          onClick={() => navigate('/vendor-checklist')}
          className="w-full flex items-center justify-center gap-2 bg-blue-400/20 hover:bg-blue-400/30 text-blue-200 font-semibold py-2 px-5 rounded-full shadow-sm
             transition duration-300 transform hover:-translate-y-0.5 active:scale-95 border border-blue-300/30"
          aria-label="Plan Event"
        >
          <FaClipboardList /> Plan
        </button>
      </div>
    </div>
  );
}

export default EventlistCard;
