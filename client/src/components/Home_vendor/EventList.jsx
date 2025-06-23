import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import EventlistCard from './EventlistCard';

function EventList() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/api/event/all-events', {
          headers: {
            Authorization: token
          }
        });
        if (res.data.status === true) {
          setEvents(res.data.events);
        } else {
          toast.error("You Have No Events", { duration: 1000 });
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    }
    fetchdata();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#161B22] font-poppins-custom text-white">
      <div className='flex-grow flex flex-col bg-[#161B22] rounded-xl p-2 shadow-lg p-8'>

        <h2 className="text-white text-4xl font-bold text-center mb-8 tracking-wide">Assigned Events</h2>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
          {events && events.map((event) => (
            <EventlistCard
              key={event._id}
              event={event}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventList;
