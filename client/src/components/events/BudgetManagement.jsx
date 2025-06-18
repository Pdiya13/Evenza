import React from 'react';

const budget = 5000;

const costItems = [
  { id: 1, category: 'Designing', cost: 1000 },
  { id: 2, category: 'Catering', cost: 1500 },
  { id: 3, category: 'Decoration', cost: 800 },
  { id: 4, category: 'Photography', cost: 600 },
  { id: 5, category: 'Music', cost: 700 },
];

const totalSpent = costItems.reduce((sum, item) => sum + item.cost, 0);
const remaining = budget - totalSpent;

export default function BudgetManagement() {
  return (
    <div className="min-h-screen bg-[#161B22] text-white p-8 max-w-4xl mx-auto font-sans">
      <h1 className="text-4xl font-bold mb-8">Budget Management</h1>

      {/* Total Budget with hover */}
      <div
        className="mb-8 p-6 bg-[#0d1117] rounded-lg shadow-lg transform transition-all duration-300 hover:scale-[1.03] hover:shadow-blue-500/50 cursor-pointer"
      >
        <h2 className="text-2xl font-semibold mb-4">Total Budget</h2>
        <p className="text-3xl font-extrabold text-blue-300">${budget.toLocaleString()}</p>
      </div>

      {/* Cost Breakdown List */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cost Breakdown</h2>
        <ul className="divide-y divide-gray-700 rounded-lg overflow-hidden bg-[#0d1117] shadow-lg">
          {costItems.map(({ id, category, cost }) => (
            <li
              key={id}
              className="flex justify-between items-center p-4 hover:bg-[#21262d] transition-colors cursor-default"
            >
              <span className="text-lg">{category}</span>
              <span className="font-semibold text-lg">${cost.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Total Spent */}
      <div className="p-6 bg-[#0d1117] rounded-lg shadow-lg flex justify-between text-xl font-semibold">
        <span>Total Spent:</span>
        <span>${totalSpent.toLocaleString()}</span>
      </div>

      {/* Remaining Budget with hover */}
      <div
        className={`mt-4 p-6 rounded-lg shadow-lg flex justify-between text-xl font-semibold transform transition-all duration-300 cursor-pointer hover:scale-[1.03] ${
          remaining < 0
            ? 'bg-red-700 text-red-100 hover:shadow-red-500/50'
            : 'bg-green-700 text-green-100 hover:shadow-green-500/50'
        }`}
      >
        <span>Remaining Budget:</span>
        <span>${remaining.toLocaleString()}</span>
      </div>

      {/* Button */}
      <div className="mt-8 text-center">
        <button
          className="px-6 py-3 rounded-lg border border-blue-500 text-blue-400 hover:text-white hover:bg-blue-500 transition-all duration-300 shadow-md hover:shadow-blue-500/40"
        >
          Download Report
        </button>
      </div>
    </div>
  );
}
