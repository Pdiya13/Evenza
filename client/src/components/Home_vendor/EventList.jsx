import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventlistCard from './EventlistCard';

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/api/vendor/accepted-events', {
          headers: {
            Authorization: token,
          },
        });

        if (res.data.status) {
          setEvents(res.data.events);
        } else {
          setError('Failed to fetch events');
        }
      } catch (err) {
        setError('Error fetching events');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading events...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="w-full min-h-screen bg-[#161B22] font-poppins-custom text-white">
      <div className="flex-grow flex flex-col bg-[#161B22] rounded-xl p-2 shadow-lg p-8">
        <h2 className="text-4xl font-bold text-center mb-8 border-b border-gray-700 pb-3 tracking-wide">
          Assigned Events
        </h2>

        {events.length === 0 ? (
          <p className="text-center text-gray-400">No assigned events found.</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
            {events.map((event) => (
              <EventlistCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EventList;
