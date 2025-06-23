import React from 'react';

function RatingCard({ userName, comment, rating, eventName, date }) {
  const getRatingColor = () => {
    if (rating >= 4) return 'bg-green-500';
    if (rating >= 2.5) return 'bg-yellow-400';
    return 'bg-red-500';
  };

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

      {/* Rating Bar */}
      <div className="mb-4">
        <div className="w-full h-3 bg-gray-600 rounded-full overflow-hidden">
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
