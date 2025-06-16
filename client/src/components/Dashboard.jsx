import React from 'react';
import Navbar from './Navbar';
import Header from './Header';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { FaUsers, FaLightbulb, FaCalendarAlt, FaMapMarkerAlt, FaChartBar, FaCheckCircle, FaTimesCircle, FaPeopleArrows } from 'react-icons/fa';
// import { FaRegClock, FaMapMarkerAlt } from 'react-icons/fa';

const pieData = [
  { name: 'Meetings', value: 60 },
  { name: 'Attended', value: 30 },
  { name: 'Rejected', value: 10 },
];
const COLORS = ['#8B5CF6', '#10B981', '#F59E0B'];

function Dashboard() {
  return (
    <div className='w-screen min-h-screen bg-gradient-to-br from-[#1F2937] to-[#4B5563] font-sans text-white'>
      <Header title={['Reminders', 'User']} />
      <div className='w-full h-full flex flex-row'>
        <Navbar />
        <div className="m-8 min-h-[83vh] w-full bg-transparent p-6">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="bg-white/20 backdrop-blur-lg border border-white/10 shadow-lg rounded-xl p-6 hover:shadow-xl transition">
              <div className="flex items-center gap-2 mb-1">
                <FaPeopleArrows className="text-indigo-300" />
                <p className="text-white text-sm font-medium">Meetings</p>
              </div>
              <h2 className="text-3xl font-bold tracking-wide">124k</h2>
            </div>
            <div className="bg-white/20 backdrop-blur-lg border border-white/10 shadow-lg rounded-xl p-6 hover:shadow-xl transition">
              <div className="flex items-center gap-2 mb-1">
                <FaCheckCircle className="text-green-300" />
                <p className="text-white text-sm font-medium">Attended</p>
              </div>
              <h2 className="text-3xl font-bold tracking-wide">25k</h2>
            </div>
            <div className="bg-white/20 backdrop-blur-lg border border-white/10 shadow-lg rounded-xl p-6 hover:shadow-xl transition">
              <div className="flex items-center gap-2 mb-1">
                <FaTimesCircle className="text-red-300" />
                <p className="text-white text-sm font-medium">Rejected</p>
              </div>
              <h2 className="text-3xl font-bold tracking-wide">10k</h2>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-[#5B21B6]/80 via-white/10 to-[#7C3AED]/80 backdrop-blur-lg border border-white/10 p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-2 mb-1">
                  <FaUsers className="text-lg text-indigo-200" />
                  <h3 className="text-xl font-bold tracking-wide">Creator Meetup</h3>
                </div>
                <p className="text-sm text-white/80 font-medium">10 Aug, 2020 : 10:15AM - 12:30PM</p>
                <p className="text-indigo-300 mt-2 font-medium">142 Members</p>
              </div>
              <div className="bg-gradient-to-r from-[#D97706]/80 via-white/10 to-[#F59E0B]/80 backdrop-blur-lg border border-white/10 p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-2 mb-1">
                  <FaLightbulb className="text-lg text-yellow-100" />
                  <h3 className="text-xl font-bold tracking-wide">Design Thinking</h3>
                </div>
                <p className="text-sm text-white/80 font-medium">12 Aug, 2020 : 8:30AM - 15:30PM</p>
                <p className="text-indigo-300 mt-2 font-medium">245 Members</p>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FaCalendarAlt className="text-white/70" />
                <h4 className="text-md font-semibold">August, 2020</h4>
              </div>
              <div className="grid grid-cols-7 text-sm text-white gap-1">
                {[...Array(31)].map((_, i) => (
                  <div key={i} className={`w-8 h-8 flex items-center justify-center rounded-full ${i + 1 === 8 ? 'bg-purple-600 text-white' : 'hover:bg-purple-300/20'}`}>{i + 1}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 grid grid-cols-3 gap-4">

              <div className="bg-white/20 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-4">
                <div className="flex items-end space-x-1">
                  <span className="text-3xl font-extrabold text-white">18</span>
                  <span className="text-sm font-semibold text-white/80">Aug</span>
                </div>
                <h4 className="font-bold text-lg tracking-wide mt-1">Design Meeting</h4>
                <div className="flex items-center space-x-2 mt-1">
                  {/* <FaRegClock className="text-white/70 text-sm" /> */}
                  <p className="text-sm text-white/90 font-medium">10:15AM - 12:30PM</p>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <FaMapMarkerAlt className="text-white/90 text-sm" />
                  <p className="text-sm text-white/90 font-medium">Lorem</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-4">
                <div className="flex items-end space-x-1">
                  <span className="text-3xl font-extrabold text-white">22</span>
                  <span className="text-sm font-semibold text-white/80">Aug</span>
                </div>
                <h4 className="font-bold text-lg tracking-wide mt-1">Workshop Meeting</h4>
                <div className="flex items-center space-x-2 mt-1">
                  {/* <FaRegClock className="text-white/70 text-sm" /> */}
                  <p className="text-sm text-white/90 font-medium">9:00AM - 15:30PM</p>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <FaMapMarkerAlt className="text-white/90 text-sm" />
                  <p className="text-sm text-white/90 font-medium">Lorem</p>
                </div>
              </div>

              {/* Weekly Meeting */}
              <div className="bg-white/20 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-4">
                <div className="flex items-end space-x-1">
                  <span className="text-3xl font-extrabold text-white">28</span>
                  <span className="text-sm font-semibold text-white/80">Aug</span>
                </div>
                <h4 className="font-bold text-lg tracking-wide mt-1">Weekly Meeting</h4>
                <div className="flex items-center space-x-2 mt-1">
                  {/* <FaRegClock className="text-white/70 text-sm" /> */}
                  <p className="text-sm text-white/90 font-medium">10:30AM - 17:00PM</p>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <FaMapMarkerAlt className="text-white/90 text-sm" />
                  <p className="text-sm text-white/90 font-medium">Lorem</p>
                </div>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-4">
              <h4 className="font-bold text-md mb-2 tracking-wide">Meeting Stats</h4>
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
    </div>
  );
}

export default Dashboard;
