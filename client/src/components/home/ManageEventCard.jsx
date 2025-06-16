import React from 'react'
import { Link } from 'react-router-dom';

function ManageEventCard({ ename, location, date, type }) {
  return (
     <div className="bg-gradient-to-br from-black to-gray-800 text-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
      <h3 className="text-2xl font-bold mb-2">{ename}</h3>
      <p className="text-sm text-gray-300 mb-1"><span className="font-semibold">📍 Location:</span> {location}</p>
      <p className="text-sm text-gray-300 mb-1"><span className="font-semibold">📅 Date:</span> {date}</p>
      <p className="text-sm text-gray-300"><span className="font-semibold">🏷️ Type:</span> {type}</p>

      <Link 
        to={"/login"} 
        className="mt-4 inline-block bg-slate-700 text-white text-sm font-semibold py-2 px-4 rounded hover:bg-slate-800 transition"
      >
        View Details
      </Link>
    </div>
  )
}

export default ManageEventCard
