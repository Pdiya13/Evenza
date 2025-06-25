import React, { useEffect, useState } from 'react';
import ManageEventCard from './ManageEventCard';
import Header from "../Header";
import Navbar from "../Navbar";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function ManageEvent() {

  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchdata(){
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/api/event/all-events', {
        headers: {
          Authorization: token
        }
      });
      console.log(res.data);
      if (res.data.status == true) {
        setEvents(res.data.events);
      }
      else
        toast.error("You Have No Events", {duration : 1000});
    }
    catch (err) {
      toast.error(err);
    }
  }
  fetchdata();
  }, []);

  return (

    <div className="w-full min-h-screen bg-[#161B22] font-poppins-custom text-white">
      <div className='flex-grow flex flex-col bg-[#161B22] rounded-xl p-2 shadow-lg p-8'>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-700 bg-[#0D1117] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 sm:mb-0"
          />
          <button
            onClick={() => navigate('/create')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 ml-0 sm:ml-4 transition"
          >
            Create Event
          </button>
        </div>

        <h2 className="text-white text-4xl font-bold text-center mb-8 tracking-wide">Upcoming Events</h2>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
          {events && events.map((event) => (
            <ManageEventCard
              key={event._id}
              event={event}
              setEvents={setEvents}
              events={events}
            />
          ))}
        </div>
      </div>
    </div>
    // </div>
  );
}

export default ManageEvent;
