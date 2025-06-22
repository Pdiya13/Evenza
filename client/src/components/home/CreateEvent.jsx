import React, { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast'
import axios from 'axios';

function CreateEvent() {
  const [formData, setFormData] = useState({
    ename: '',
    location: '',
    description: '',
    date: '',
    type: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log("Hi")
      const response = await axios.post(
        'http://localhost:8080/api/event/create',
        formData,
        {
          headers: {
            Authorization: token
          }
        }
      );
      console.log(response.status)
      if (response.data.status == true) {
        toast.success("Event created sucessfully");
        setFormData({
          ename: '',
          location: '',
          description: '',
          date: '',
          type: '',
        });
        navigate('/manage');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
    }
  };
  return (
    <div className="font-poppins-custom h-screen bg-[#C3D0E5] flex items-center justify-center px-4 text-white">
      {
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-black to-gray-800 shadow-2xl rounded-xl p-10 w-full max-w-xl flex flex-col gap-6"
        >
          <h2 className="text-4xl font-semibold text-center text-white">Create New Event</h2>

          <input
            type="text"
            name="ename"
            placeholder="Event Name"
            value={formData.ename}
            onChange={handleChange}
            className="border border-gray-500 rounded-lg w-full h-10 bg-transparent text-white placeholder-white pl-2"
          />

          <input
            type="text"
            name="location"
            placeholder="Event Location"
            value={formData.location}
            onChange={handleChange}
            className="border border-gray-500 rounded-lg w-full h-10 bg-transparent text-white placeholder-white pl-2"
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-500 rounded-lg w-full h-10 bg-transparent text-white placeholder-white pl-2"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="border border-gray-500 rounded-lg w-full h-10 bg-transparent text-white placeholder-white p-2"
          />

          <input
            type="text"
            name="type"
            placeholder="Event Type (e.g., In-person, Online, Hybrid)"
            value={formData.type}
            onChange={handleChange}
            className="border border-gray-500 rounded-lg w-full h-10 bg-transparent text-white placeholder-white pl-2"
          />

          <button
            type="submit"
            className="bg-slate-700 text-white py-3 px-6 text-lg rounded-md hover:bg-slate-800 transition-all duration-300 shadow-md"
          >
            Create Event
          </button>
        </form>}
    </div>
  );
}

export default CreateEvent;

