import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

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
    <div className="min-h-screen bg-[#161B22] text-white px-6 py-8 max-w-6xl mx-auto font-sans text-base">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Budget Management</h1>
        <button className="px-5 py-2 text-sm rounded border border-blue-500 text-blue-400 hover:text-white hover:bg-blue-500 transition-all duration-300 shadow-md hover:shadow-blue-500/40">
          Download Report
        </button>
      </div>

      {/* Summary and Speedometer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Budget Summary */}
        <div className="space-y-4">
          {/* Total Budget */}
          <div className="p-4 bg-[#0d1117] rounded-lg shadow-md hover:shadow-blue-500/30 transition">
            <h2 className="text-lg font-semibold mb-1">Total Budget</h2>
            <p className="text-2xl font-bold text-blue-300">${budget.toLocaleString()}</p>
          </div>

          {/* Total Spent */}
          <div className="p-4 bg-[#0d1117] rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-1">Total Spent</h2>
            <p className="text-xl font-bold">${totalSpent.toLocaleString()}</p>
          </div>

          {/* Remaining */}
          <div
            className={`p-4 rounded-lg shadow-md transition ${
              remaining < 0
                ? 'bg-red-700 text-red-100'
                : 'bg-green-700 text-green-100'
            }`}
          >
            <h2 className="text-lg font-semibold mb-1">Remaining</h2>
            <p className="text-xl font-bold">${remaining.toLocaleString()}</p>
          </div>
        </div>

        {/* Speedometer */}
        <div className="p-4 bg-[#0d1117] rounded-lg shadow-md text-center flex flex-col justify-center items-center border border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Budget Utilization</h2>
          <ReactSpeedometer
            maxValue={budget}
            value={totalSpent}
            needleColor="white"
            startColor="green"
            endColor="red"
            segments={10}
            currentValueText={`Spent: $${totalSpent.toLocaleString()}`}
            textColor="white"
            height={200}
            ringWidth={30}
            needleTransition="easeElastic"
            needleTransitionDuration={3000}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Cost Breakdown</h2>
        <ul className="divide-y divide-gray-700 rounded-lg overflow-hidden bg-[#0d1117] shadow-lg">
          {costItems.map(({ id, category, cost }) => (
            <li
              key={id}
              className="flex justify-between items-center px-4 py-3 hover:bg-[#21262d] transition-colors"
            >
              <span className="text-base">{category}</span>
              <span className="font-medium text-base">${cost.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
