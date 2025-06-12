import React from 'react';

function Card({ title, description, className }) {
  return (
    <div className={`min-w-[20rem] h-60 rounded-xl p-6 text-white shadow-lg flex flex-col justify-between ${className}`}>
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p>{description}</p>
      </div>
      <button className="mt-4 bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
        Explore More
      </button>
    </div>
  );
}

export default Card;
