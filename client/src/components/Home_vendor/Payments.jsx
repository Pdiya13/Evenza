 import React from 'react';

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
  return (
    <div className="min-h-screen bg-[#0D1117] p-8 font-poppins-custom text-white">
      <h1 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-3">Payments</h1>

      <div className="overflow-x-auto rounded-xl border border-gray-700">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-[#161B22] text-gray-400 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">User Name</th>
              <th className="px-6 py-3">Event Name</th>
              <th className="px-6 py-3">Transaction Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Amount (₹)</th>
            </tr>
          </thead>
          <tbody className="bg-[#0D1117] text-gray-200 divide-y divide-gray-700">
            {mockPayments.map((payment, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{payment.userName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{payment.eventName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{payment.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      payment.status === 'Success'
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">₹{payment.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payments;
