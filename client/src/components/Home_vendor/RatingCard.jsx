import React from 'react';

function RatingCard({ userName, comment, rating, eventName, date }) {

  const getColor = () => {
    if (rating >= 4) return 'text-green-400';
    if (rating >= 2.5) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="w-full max-w-sm p-6 rounded-2xl bg-[#0D1117] border border-[#30363d] shadow-lg hover:shadow-blue-500/20 transition-all duration-300">

      {/* TOP */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-white">{userName}</h3>
        <p className="text-xs text-gray-400">{date}</p>
      </div>

      {/* EVENT */}
      <p className="text-sm text-blue-400 mb-3">
        Event: <span className="text-gray-300">{eventName}</span>
      </p>

      {/* ⭐ STARS */}
      <div className="flex items-center gap-1 mb-2">
        {[1,2,3,4,5].map((star) => (
          <span
            key={star}
            className={`text-lg ${
              star <= Math.round(rating) ? getColor() : 'text-gray-600'
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* RATING TEXT */}
      <p className={`text-sm font-medium ${getColor()} mb-3`}>
        {rating.toFixed(1)} / 5
      </p>

      {/* COMMENT */}
      <p className="text-gray-400 text-sm leading-relaxed">
        {comment || "No review provided"}
      </p>

    </div>
  );
}

export default RatingCard;