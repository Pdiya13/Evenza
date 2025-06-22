import React, { useEffect, useState } from 'react';
import ManageEventCard from './ManageEventCard';
import Header from "../Header";
import Navbar from "../Navbar";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function ManageEvent() {
  const sampleEvents = [
    {
      id: 1,
      ename: "AI Conference 2025",
      location: "Bangalore",
      date: "2025-08-10",
      type: "Tech Meetup",
    },
    {
      id: 2,
      ename: "React Developer Summit",
      location: "Mumbai",
      date: "2025-09-15",
      type: "Web Conference",
    },
    {
      id: 3,
      ename: "Startup Pitch Night",
      location: "Delhi",
      date: "2025-07-22",
      type: "Startup Event",
    },
    {
      id: 4,
      ename: "Hackathon 3.0",
      location: "Hyderabad",
      date: "2025-10-05",
      type: "Coding Competition",
    },
    {
      id: 5,
      ename: "Cybersecurity Bootcamp",
      location: "Pune",
      date: "2025-11-12",
      type: "Workshop",
    },
  ];

  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(sampleEvents);
  }, []);

  useEffect(async () => {
    try{
    const token = localStorage.getItem('token');
    const res = axios.get('http://localhost:8080/api/event/all-events', {
      headers : {
        Authorization : token,
      }
    });

    if(res.data.status)
    {
      setEvents(res.data);
    }
  }
  catch(error)
  {
    toast.error("error");
    console.log(error);
  }
  },[events]);

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
          {events.map((event) => (
            <ManageEventCard
              key={event.id}
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
