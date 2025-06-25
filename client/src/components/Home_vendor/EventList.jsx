import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventlistCard from './EventlistCard';

function EventList() {
  const navigate = useNavigate();
  
  const [events, setEvents] = useState([
    {
      _id: '1',
      title: 'React Conference 2025',
      description: 'Join developers around the world for React insights and networking.',
      date: '2025-07-10',
      location: 'San Francisco, CA',
    },
    {
      _id: '2',
      title: 'JavaScript Summit',
      description: 'A summit focused on modern JavaScript and tooling.',
      date: '2025-08-15',
      location: 'New York, NY',
    },
    {
      _id: '3',
      title: 'UX/UI Bootcamp',
      description: 'Hands-on workshop for improving design and usability skills.',
      date: '2025-09-05',
      location: 'Austin, TX',
    },
  ]);

  return (
    <div className="w-full min-h-screen bg-[#161B22] font-poppins-custom text-white">
      <div className="flex-grow flex flex-col bg-[#161B22] rounded-xl p-2 shadow-lg p-8">
        <h2 className="text-4xl font-bold text-center mb-8 border-b border-gray-700 pb-3 tracking-wide">
          Assigned Events
        </h2>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
          {events.map((event) => (
            <EventlistCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventList;
