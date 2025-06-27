import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {jwtDecode} from 'jwt-decode';

const mockPayments = [
  {
    userName: 'Anjali Sharma',
    eventName: 'Wedding Ceremony',
    date: '2025-06-20',
    status: 'Success',
    amount: 25000,
  },
  {
    userName: 'Ravi Mehta',
    eventName: 'Corporate Meetup',
    date: '2025-06-18',
    status: 'Success',
    amount: 18000,
  },
  {
    userName: 'Priya Singh',
    eventName: 'Birthday Bash',
    date: '2025-06-15',
    status: 'Failed',
    amount: 12000,
  },
];

function Payments() {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const decoded = jwtDecode(token);
        const vendorId = decoded.id;

        const response = await axios.get(`http://localhost:8080/api/vendor/${vendorId}/payments`, {
          headers: {
            Authorization: token,
          }
        });

        setQueries(response.data);
      } catch (error) {
        console.error('Error fetching queries:', error);
        toast.error('Failed to load vendor queries.');
      }
    };
    fetchQueries();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await axios.post(`http://localhost:8080/api/vendor/payments/${id}`, { status: action });
      setQueries((prev) => prev.filter((q) => q._id !== id));
      toast.success(`Query ${action === 'accepted' ? 'Accepted' : 'Rejected'}`);
    } catch (error) {
      console.log(error);
      toast.error('Failed to update query status.');
    }
  };

  return (
    <div className="min-h-screen p-8 font-poppins-custom text-white">
      <div className="mb-12 p-6 rounded-xl shadow-xl border border-gray-700 bg-[#161B22]">
        <h1 className="text-2xl font-extrabold text-white mb-4 tracking-wide border-b border-gray-700 pb-3">
          Payment History
        </h1>

        <div className="overflow-x-auto rounded-xl bg-[#0D1117] border border-gray-700">
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="text-gray-400 bg-[#161B22]/50 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">User Name</th>
                <th className="px-6 py-4">Event Name</th>
                <th className="px-6 py-4">Transaction Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-gray-200">
              {mockPayments.map((payment, index) => (
                <tr key={index} className="hover:bg-white/5 transition duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">{payment.userName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{payment.eventName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{payment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        payment.status === 'Success'
                          ? 'bg-green-400/10 text-green-300 border border-green-400/30'
                          : 'bg-red-400/10 text-red-300 border border-red-400/30'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-amber-200">
                    ₹{payment.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-6 rounded-xl shadow-xl border border-gray-700 bg-[#161B22]">
        <h2 className="text-2xl font-extrabold text-white mb-4 tracking-wide border-b border-gray-700 pb-3">
          Vendor Queries
        </h2>
        <div className="overflow-x-auto rounded-xl bg-[#0D1117] border border-gray-700">
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="text-gray-400 bg-[#161B22]/50 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Event</th>
                <th className="px-6 py-4">Vendor</th>
                <th className="px-6 py-4">Event Date</th>
                <th className="px-6 py-4">Budget (₹)</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-gray-200">
              {queries.map((query) => (
                <tr key={query._id} className="hover:bg-white/5 transition duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">{query.userName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{query.eventName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{query.vendorName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{query.eventDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-amber-200">
                    ₹{query.budget.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400/10 text-yellow-300 border border-yellow-400/30">
                      {query.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                    <button
                      onClick={() => handleAction(query._id, 'accepted')}
                      className="px-3 py-1 text-xs rounded bg-green-600 hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(query._id, 'rejected')}
                      className="px-3 py-1 text-xs rounded bg-red-600 hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
              {queries.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-gray-400 p-4">
                    No pending queries.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Payments;
