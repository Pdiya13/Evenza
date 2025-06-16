import React from 'react';
import Navbar from './Navbar';
import Header from './Header';

import CreateEvent from './home/CreateEvent';
import ManageEvent from './home/ManageEvent';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import {
  FaUsers,
  FaLightbulb,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPeopleArrows,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import Vendors from './home/Vendors';

const pieData = [
  { name: 'Meetings', value: 60 },
  { name: 'Attended', value: 30 },
  { name: 'Rejected', value: 10 },
];
const COLORS = ['#14B8A6', '#FB6F6F', '#3B82F6']; // Teal, Coral, Blue

function Dashboard() {
  return (
    <div className="w-screen min-h-screen bg-[#F1F5FF] font-sans">
      <Header title={['Reminders', 'User']} />
      <div className="w-full h-full flex flex-row">
        <Navbar />
        <div className="m-8 min-h-[83vh] w-full bg-[#C3D0E5] rounded-xl p-6 shadow-md">
          {/* Top summary cards */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <SummaryCard
              icon={<FaPeopleArrows className="text-teal-600" />}
              label="Meetings"
              value="124k"
              bg="#C3D0E5"
              textColor="text-gray-900"
              borderColor="border-gray-300"
              iconBg="rgba(20,184,166,0.15)"
            />
            <SummaryCard
              icon={<FaCheckCircle className="text-green-600" />}
              label="Attended"
              value="25k"
              bg="#C3D0E5"
              textColor="text-gray-900"
              borderColor="border-gray-300"
              iconBg="rgba(34,197,94,0.15)"
            />
            <SummaryCard
              icon={<FaTimesCircle className="text-red-600" />}
              label="Rejected"
              value="10k"
              bg="#C3D0E5"
              textColor="text-gray-900"
              borderColor="border-gray-300"
              iconBg="rgba(239,68,68,0.15)"
            />
          </div>

          {/* Upcoming Events */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <EventCard
                icon={<FaUsers className="text-gray-900" />}
                title="Creator Meetup"
                dateTime="10 Aug, 2020 : 10:15AM - 12:30PM"
                members="142 Members"
                gradient="linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%)" // Blue gradient
              />
              <EventCard
                icon={<FaLightbulb className="text-gray-900" />}
                title="Design Thinking"
                dateTime="12 Aug, 2020 : 8:30AM - 15:30PM"
                members="245 Members"
                gradient="linear-gradient(90deg, #FBBF24 0%, #FCD34D 100%)" // Warm yellow gradient
              />
            </div>

            <Calendar />
          </div>

          {/* Meetings list and Pie chart */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 grid grid-cols-3 gap-4">
              <MeetingCard
                day={18}
                month="Aug"
                title="Design Meeting"
                time="10:15AM - 12:30PM"
                location="Lorem"
                bg="#C3D0E5"
                textColor="text-gray-900"
                borderColor="border-gray-300"
              />
              <MeetingCard
                day={22}
                month="Aug"
                title="Workshop Meeting"
                time="9:00AM - 15:30PM"
                location="Lorem"
                bg="#C3D0E5"
                textColor="text-gray-900"
                borderColor="border-gray-300"
              />
              <MeetingCard
                day={28}
                month="Aug"
                title="Weekly Meeting"
                time="10:30AM - 17:00PM"
                location="Lorem"
                bg="#C3D0E5"
                textColor="text-gray-900"
                borderColor="border-gray-300"
              />
            </div>

            <div
              className="rounded-xl shadow-md p-4 border border-gray-300"
              style={{ backgroundColor: '#C3D0E5' }}
            >
              <h4 className="font-bold text-md mb-2 tracking-wide text-gray-900">
                Meeting Stats
              </h4>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" outerRadius={50} fill="#8884d8" label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* test manage event page */}
      <ManageEvent />
    </div>
  );
}

function SummaryCard({ icon, label, value, bg, textColor, borderColor, iconBg }) {
  return (
    <div
      className={`rounded-xl p-6 border ${borderColor} bg-white shadow-sm hover:shadow-md transition`}
      style={{ backgroundColor: bg }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-full" style={{ backgroundColor: iconBg || 'transparent' }}>
          {icon}
        </div>
        <p className={`${textColor} text-sm font-semibold`}>{label}</p>
      </div>
      <h2 className={`text-3xl font-extrabold tracking-wide ${textColor}`}>{value}</h2>
    </div>
  );
}

function EventCard({ icon, title, dateTime, members, gradient }) {
  return (
    <div className="p-5 rounded-xl shadow-md text-gray-900" style={{ background: gradient }}>
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-sm opacity-90 font-medium">{dateTime}</p>
      <p className="mt-2 font-medium opacity-90">{members}</p>
    </div>
  );
}

function Calendar() {
  return (
    <div
      className="border rounded-xl shadow-md p-4 border-gray-300"
      style={{ backgroundColor: '#C3D0E5' }}
    >
      <div className="flex items-center gap-2 mb-2">
        <FaCalendarAlt className="text-gray-800" />
        <h4 className="text-md font-semibold text-gray-900">August, 2020</h4>
      </div>
      <div className="grid grid-cols-7 text-sm text-gray-900 gap-1">
        {[...Array(31)].map((_, i) => (
          <div
            key={i}
            className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-blue-300 transition ${
              i + 1 === 8
                ? 'ring-2 ring-blue-600 text-blue-800 font-semibold bg-blue-100'
                : 'text-gray-900'
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

function MeetingCard({ day, month, title, time, location, bg, textColor, borderColor }) {
  return (
    <div
      className={`rounded-xl p-5 border ${borderColor} shadow-sm ${textColor}`}
      style={{ backgroundColor: bg }}
    >
      <div className="flex items-end space-x-2 mb-2">
        <span className="text-3xl font-extrabold">{day}</span>
        <span className="text-sm font-semibold opacity-80">{month}</span>
      </div>
      <h4 className="font-bold text-lg tracking-wide">{title}</h4>
      <p className="text-sm font-medium opacity-90 mt-1">{time}</p>
      <div className="flex items-center gap-2 mt-2">
        <div className="p-1 rounded-full bg-gray-300/50">
          <FaMapMarkerAlt className="text-gray-700 text-sm" />
        </div>
        <p className="text-sm font-medium opacity-90">{location}</p>
      </div>
    </div>
  );
}

export default Dashboard;
