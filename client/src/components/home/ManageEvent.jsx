import React, { createElement } from 'react';
import ManageEventCard from './ManageEventCard';

function ManageEvent({ ename, location, date, type }) {

    const sampleEvents = [
      {
        ename: "AI Conference 2025",
        location: "Bangalore",
        date: "2025-08-10",
        type: "Tech Meetup",
      },
      {
        ename: "React Developer Summit",
        location: "Mumbai",
        date: "2025-09-15",
        type: "Web Conference",
      },
      {
        ename: "Startup Pitch Night",
        location: "Delhi",
        date: "2025-07-22",
        type: "Startup Event",
      },
      {
        ename: "Hackathon 3.0",
        location: "Hyderabad",
        date: "2025-10-05",
        type: "Coding Competition",
      },
      {
        ename: "Cybersecurity Bootcamp",
        location: "Pune",
        date: "2025-11-12",
        type: "Workshop",
      },
    ];

  return (
    <div>
        <div className="min-h-screen py-10 px-6">
      <h2 className="text-gray-800 text-4xl font-bold text-center mb-8">Upcoming Events</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
        {sampleEvents.map((event, index) => (
          <ManageEventCard
            key={index}
            ename={event.ename}
            location={event.location}
            date={event.date}
            type={event.type}
          />
        ))}
      </div>
    </div>

    </div>
  );
}

export default ManageEvent;
