import React from 'react';
import RatingCard from './RatingCard';

const mockRatings = [
  {
    userName: 'Anjali Sharma',
    comment: 'Great vendor, very cooperative and timely service.',
    rating: 4.8,
    eventName: 'Wedding Ceremony',
    date: 'Jun 10, 2025',
  },
  {
    userName: 'Ravi Mehta',
    comment: 'Good experience overall, but there were slight delays.',
    rating: 3.5,
    eventName: 'Corporate Meetup',
    date: 'May 28, 2025',
  },
  {
    userName: 'Priya Singh',
    comment: 'Average service, but staff was friendly.',
    rating: 3,
    eventName: 'Birthday Bash',
    date: 'May 12, 2025',
  },
  {
    userName: 'Aman Verma',
    comment: 'Poor communication and late setup. Not recommended.',
    rating: 2.3,
    eventName: 'Product Launch',
    date: 'Apr 21, 2025',
  },
];

function Ratings() {
  return (
    <div className="min-h-screen bg-[#0D1117] p-8 font-poppins-custom text-white">
      <h1 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-3">Vendor Ratings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRatings.map((rating, index) => (
          <RatingCard key={index} {...rating} />
        ))}
      </div>
    </div>
  );
}

export default Ratings;
