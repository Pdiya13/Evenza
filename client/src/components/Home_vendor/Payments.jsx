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
    <div className="min-h-screen p-8 font-poppins-custom text-white">
      <div className="mt-12 p-6 rounded-xl shadow-xl border border-gray-700 bg-[#161B22]">
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
    </div>
  );
}

export default Payments;
