import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer , Legend } from 'recharts';
import {
  FaUsers,
  FaLightbulb,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPeopleArrows,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';

const pieData = [
  { name: 'Meetings', value: 60 },
  { name: 'Attended', value: 30 },
  { name: 'Rejected', value: 10 },
];
const COLORS = ['#14B8A6', '#FB6F6F', '#3B82F6']; // Teal, Coral, Blue

function VendorDashboard() {
  return (
    <div className="min-h-screen bg-[#161B22]  font-poppins-custom text-white">
      <main className="min-h-[83vh] rounded-xl pr-8 pl-8 pb-8 pt-2 shadow-xl">

        <h1 className="text-4xl font-extrabold text-gray-200 mb-12 border-b border-gray-700 pb-3 select-none tracking-wide">
          Dashboard
        </h1>
        <div className="grid grid-cols-3 gap-8 mb-8">
          <SummaryCard
            icon={<FaPeopleArrows className="text-teal-400" />}
            label="Meetings"
            value="124k"
            bg="rgba(20, 184, 166, 0.1)"
            textColor="text-teal-400"
            borderColor="border-teal-600"
          />
          <SummaryCard
            icon={<FaCheckCircle className="text-green-400" />}
            label="Attended"
            value="25k"
            bg="rgba(34, 197, 94, 0.1)"
            textColor="text-green-400"
            borderColor="border-green-600"
          />
          <SummaryCard
            icon={<FaTimesCircle className="text-red-400" />}
            label="Rejected"
            value="10k"
            bg="rgba(251, 111, 111, 0.1)"
            textColor="text-red-400"
            borderColor="border-red-600"
          />
        </div>
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div className="col-span-2 grid grid-cols-2 gap-6">
            <EventCard
              icon={<FaUsers className="text-white" />}
              title="Creator Meetup"
              dateTime="10 Aug, 2020 : 10:15AM - 12:30PM"
              members="142 Members"
              gradient="linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)" // Blue gradient
            />
            <EventCard
              icon={<FaLightbulb className="text-white" />}
              title="Design Thinking"
              dateTime="12 Aug, 2020 : 8:30AM - 15:30PM"
              members="245 Members"
              gradient="linear-gradient(135deg, #FBBF24 0%, #FCD34D 100%)" // Yellow gradient
            />
          </div>

          <Calendar />
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 grid grid-cols-3 gap-6">
            <MeetingCard
              day={18}
              month="Aug"
              title="Design Meeting"
              time="10:15AM - 12:30PM"
              location="Lorem"
              bg="rgba(59, 130, 246, 0.1)"
              textColor="text-blue-400"
              borderColor="border-blue-600"
            />
            <MeetingCard
              day={22}
              month="Aug"
              title="Workshop Meeting"
              time="9:00AM - 15:30PM"
              location="Lorem"
              bg="rgba(251, 191, 36, 0.1)"
              textColor="text-yellow-400"
              borderColor="border-yellow-600"
            />
            <MeetingCard
              day={28}
              month="Aug"
              title="Weekly Meeting"
              time="10:30AM - 17:00PM"
              location="Lorem"
              bg="rgba(239, 68, 68, 0.1)"
              textColor="text-red-400"
              borderColor="border-red-600"
            />
          </div>

          <div
            className="rounded-xl shadow-xl p-6 border border-gray-700 bg-[#0D1117] flex flex-col justify-center"
          >
            <h4 className="font-bold text-lg mb-4 tracking-wide text-white text-center">
              Meeting Stats
            </h4>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={70}
                  label
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#22272e',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                  }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}

function SummaryCard({ icon, label, value, bg, textColor, borderColor }) {
  return (
    <div
      className={`rounded-2xl p-6 border ${borderColor} shadow-md backdrop-blur-sm bg-opacity-10 hover:bg-opacity-20 transition cursor-pointer flex flex-col`}
      style={{ backgroundColor: bg }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-3 rounded-full bg-white/10 text-2xl">
          {icon}
        </div>
        <p className={`${textColor} text-lg font-semibold`}>{label}</p>
      </div>
      <h2 className={`text-4xl font-extrabold tracking-wide ${textColor} select-none`}>{value}</h2>
    </div>
  );
}

function EventCard({ icon, title, dateTime, members, gradient }) {
  return (
    <div
      className="p-6 rounded-2xl shadow-lg text-white cursor-pointer transform hover:scale-[1.03] transition-transform duration-300"
      style={{
        background: gradient,
        boxShadow: '0 8px 24px rgb(0 0 0 / 0.2)',
      }}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="text-3xl">{icon}</div>
        <h3 className="text-2xl font-bold tracking-wide">{title}</h3>
      </div>
      <p className="text-sm opacity-80 font-semibold">{dateTime}</p>
      <p className="mt-3 font-semibold opacity-80">{members}</p>
    </div>
  );
}

function Calendar() {
  return (
    <div
      className="border rounded-2xl shadow-lg p-6 border-gray-700 bg-[#161B22]"
    >
      <div className="flex items-center gap-3 mb-4">
        <FaCalendarAlt className="text-white text-lg" />
        <h4 className="text-lg font-semibold text-white">August, 2020</h4>
      </div>
      <div className="grid grid-cols-7 text-sm text-gray-300 gap-2 select-none">
        {[...Array(31)].map((_, i) => (
          <div
            key={i}
            className={`w-9 h-9 flex items-center justify-center rounded-full cursor-pointer transition 
              ${i + 1 === 8
                ? 'ring-2 ring-blue-500 text-blue-400 font-semibold bg-blue-900/40'
                : 'hover:bg-blue-800 hover:text-white text-gray-400'
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
      className={`rounded-2xl p-6 border ${borderColor} shadow-md backdrop-blur-sm bg-opacity-10 cursor-pointer hover:bg-opacity-20 transition ${textColor}`}
      style={{ backgroundColor: bg }}
    >
      <div className="flex items-end space-x-3 mb-4 select-none">
        <span className="text-4xl font-extrabold">{day}</span>
        <span className="text-base font-semibold opacity-90">{month}</span>
      </div>
      <h4 className="font-bold text-xl tracking-wide">{title}</h4>
      <p className="text-sm font-semibold opacity-90 mt-1">{time}</p>
      <div className="flex items-center gap-3 mt-4 opacity-80">
        <div className="p-2 rounded-full bg-white/20">
          <FaMapMarkerAlt className="text-white text-sm" />
        </div>
        <p className="text-sm font-semibold">{location}</p>
      </div>
    </div>
  );
}

export default VendorDashboard;
