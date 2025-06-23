import React from 'react';
import { FaStar } from 'react-icons/fa';

function RatingCard({ userName, comment, rating, eventName, date }) {
  return (
    <div
      className="relative w-full max-w-sm p-6 rounded-3xl bg-white/10 backdrop-blur-md
                 border border-white/20 shadow-xl transition-transform hover:scale-[1.03] hover:shadow-2xl
                 text-white flex flex-col"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-white">{userName}</h3>
        <p className="text-sm text-gray-400">{date}</p>
      </div>

      <p className="text-sm text-blue-300 font-medium mb-2">
        Event: <span className="text-white">{eventName}</span>
      </p>

      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`text-lg mr-1 ${
              i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-300">{rating.toFixed(1)} / 5</span>
      </div>

      <p className="text-gray-300 text-sm">{comment}</p>
    </div>
  );
}

export default RatingCard;
