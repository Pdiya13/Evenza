import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaSave, FaTrash, FaMapMarkerAlt, FaClipboardList, FaCalendarAlt, FaTag, FaRegCalendarCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ManageEventCard({ event, setEvents }) {
  const [isediting, setIsediting] = useState(false);
  const [editevent, setEditevent] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditevent(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = async(e) => {
    e.preventDefault();
    try {
      console.log('hi hello');
      const token = localStorage.getItem('token');
      console.log(token);

      const res = await axios.post(`http://localhost:8080/api/event/all-events/delete/${event._id}`,{},
        {
          headers: {
            Authorization:token,
          }
        }
      );
      console.log(res);
      if (res.data.status) {
        setEvents(prev => prev.filter(ev => ev._id !== event._id));
        setEditevent({});
        setIsediting(false);
        toast.success("Event Deleted SuccessFully" , {duration : 2000});
      }
      else {
        toast.error("Failed to Delete event");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEditevent(event);
    setIsediting(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      console.log('hi hello');
      const res = await axios.post(`http://localhost:8080/api/event/all-events/${event._id}`,
        editevent,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          }
        }
      );
      console.log(res);
      if (res.data.status) {
        setEvents(prevEvents => prevEvents.map(ev => ev._id === event._id ? res.data.event : ev));
        setEditevent({});
        setIsediting(false); 
        toast.success("Event Updated SuccessFully" , {duration : 2000});
      }
      else {
        toast.error("Failed to update event");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className="relative w-full max-w-sm p-6 rounded-3xl bg-white/10 backdrop-blur-md
                 border border-white/20 shadow-xl transition-transform hover:scale-[1.03] hover:shadow-2xl
                 text-white flex flex-col"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {isediting ? (
        <>
          <div className="mb-4">
            <label className="flex items-center text-sm mb-1 font-semibold text-blue-300">
              <FaRegCalendarCheck className="mr-2" /> Event Name
            </label>
            <input
              name="ename"
              value={editevent.ename}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-blue-200
                         border border-transparent focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter event name"
              autoFocus
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center text-sm mb-1 font-semibold text-green-300">
              <FaMapMarkerAlt className="mr-2" /> Location
            </label>
            <input
              name="location"
              value={editevent.location}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-green-200
                         border border-transparent focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
              placeholder="Enter location"
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center text-sm mb-1 font-semibold text-purple-300">
              <FaCalendarAlt className="mr-2" /> Date
            </label>
            <input
              name="date"
              value={editevent.date}
              onChange={handleChange}
              type="date"
              className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-purple-200
                         border border-transparent focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center text-sm mb-1 font-semibold text-pink-300">
              <FaTag className="mr-2" /> Type
            </label>
            <input
              name="type"
              value={editevent.type}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-pink-200
                         border border-transparent focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400 transition"
              placeholder="Event type"
            />
          </div>
        </>
      ) : (
        <>
          <h3 className="text-3xl font-extrabold mb-4 tracking-wide drop-shadow-lg">{event.ename}</h3>
          <p className="flex items-center text-sm mb-2 text-blue-300">
            <FaMapMarkerAlt className="mr-2" /> {event.location}
          </p>
          <p className="flex items-center text-sm mb-2 text-purple-300">
            <FaCalendarAlt className="mr-2" /> {event.date}
          </p>
          <p className="flex items-center text-sm text-pink-300">
            <FaTag className="mr-2" /> {event.type}
          </p>
        </>
      )}
      <div className="mt-auto pt-6 flex flex-wrap gap-4">
        {isediting ? (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-green-400/20 hover:bg-green-400/30 text-green-200 font-semibold py-2 px-5 rounded-full shadow-sm
               transition duration-300 transform hover:-translate-y-0.5 active:scale-95 border border-green-300/30"
            aria-label="Save Event"
          >
            <FaSave /> Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-200 font-semibold py-2 px-5 rounded-full shadow-sm
               transition duration-300 transform hover:-translate-y-0.5 active:scale-95 border border-yellow-300/30"
            aria-label="Edit Event"
          >
            <FaEdit /> Edit
          </button>
        )}

        <button
          onClick={handleDelete}
          className="flex items-center gap-2 bg-red-400/20 hover:bg-red-400/30 text-red-200 font-semibold py-2 px-5 rounded-full shadow-sm
             transition duration-300 transform hover:-translate-y-0.5 active:scale-95 border border-red-300/30"
          aria-label="Delete Event"
        >
          <FaTrash /> Delete
        </button>
        <button
          onClick={() => navigate(`'/manage/${event._id}'`)}
          className="flex items-center gap-2 bg-blue-400/20 hover:bg-blue-400/30 text-blue-200 font-semibold py-2 px-5 rounded-full shadow-sm
             transition duration-300 transform hover:-translate-y-0.5 active:scale-95 border border-blue-300/30"
          aria-label="Plan Event"
        >
          <FaClipboardList /> Plan
        </button>
      </div>
    </div>
  );
}

export default ManageEventCard;
