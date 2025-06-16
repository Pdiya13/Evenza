import React, { useState } from 'react';

function CreateEvent() {
  const [formData, setFormData] = useState({
    ename: '',
    location: '',
    description: '',
    date: '',
    type: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-black to-gray-800 shadow-2xl rounded-xl p-10 w-full max-w-xl flex flex-col gap-6"
      >
        <h2 className="text-3xl font-semibold text-center text-white">Create New Event</h2>

        <input
          type="text"
          name="ename"
          placeholder="Event Name"
          value={formData.ename}
          onChange={handleChange}
          className="input-style border border-gray-500 rounded-lg w-full h-10"
        />

        <input
          type="text"
          name="location"
          placeholder="Event Location"
          value={formData.location}
          onChange={handleChange}
          className="input-style border border-gray-500 rounded-lg w-full h-10"
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="input-style border border-gray-500 rounded-lg w-full h-10"
        />

        <div>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="input-style border border-gray-500 rounded-lg w-full h-10 p-3"
          />
        </div>

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
           className="input-style border border-gray-500 rounded-lg w-full h-10 bg-transparent appearance-none"
        >
          <option value="">Select Event Type</option>
          <option value="In-person">In-person</option>
          <option value="Online">Online</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <button
          type="submit"
          className=" bg-slate-700 text-white py-3 px-6 text-lg rounded-md hover:bg-blue-700 transition-all duration-300 shadow-md"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
