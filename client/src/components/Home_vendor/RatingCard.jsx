import React from 'react';

function RatingCard({ userName, comment, rating, eventName, date }) {
  const getRatingColor = () => {
    if (rating >= 4) return 'bg-green-500';
    if (rating >= 2.5) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  return (
    <div className="bg-[#161B22] border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-white">{userName}</h3>
        <p className="text-sm text-gray-400">{date}</p>
      </div>

      <p className="text-sm text-teal-400 font-medium mb-2">Event: {eventName}</p>

      {/* Rating Bar */}
      <div className="mb-3">
        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-3 ${getRatingColor()} rounded-full transition-all duration-300`}
            style={{ width: `${(rating / 5) * 100}%` }}
          ></div>
        </div>
        <p className="mt-1 text-sm text-gray-300">{rating.toFixed(1)} / 5</p>
      </div>

      <p className="text-gray-300 text-sm">{comment}</p>
    </div>
  );
}

export default RatingCard;
