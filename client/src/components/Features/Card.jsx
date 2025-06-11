import React from 'react';

function Card({ title, description, className }) {
  return (
    <div className={`min-w-[300px] max-w-[300px] bg-white shadow-md rounded-lg p-6 flex-shrink-0 ${className || ''}`}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Card;
