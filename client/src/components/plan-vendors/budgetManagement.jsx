import React, { useEffect, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import ReactSpeedometer from 'react-d3-speedometer';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function BudgetManagement() {
  const { eventId } = useParams();

  const [budget, setBudget] = useState(0);       // fixed total budget
  const [costItems, setCostItems] = useState([]); // detailed cost items
  const [newCategory, setNewCategory] = useState('');
  const [newCost, setNewCost] = useState('');

  // Calculate total spent as sum of cost items
  const totalSpent = costItems.reduce((sum, item) => sum + item.cost, 0);
  const remaining = budget - totalSpent;

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:8080/api/vendor/getCombinedBudget?eventId=${eventId}`,
          { headers: { authorization: token } }
        );

        if (response.data.status) {
          setBudget(response.data.totalBudget);    // fixed total budget from vendor_eventModel
          setCostItems(response.data.items);       // detailed cost items from vendor_budgetModel
        }
      } catch (err) {
        console.error('Failed to fetch budget:', err);
      }
    };

    fetchBudget();
  }, [eventId]);

  const addCostItem = async () => {
    if (newCategory.trim() === '' || isNaN(newCost) || newCost === '') return;

    const costValue = parseFloat(newCost);

    // Prevent adding if it exceeds the fixed total budget
    if (totalSpent + costValue > budget) {
      alert("Cannot add cost item. Total spent would exceed the total budget.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/api/vendor/addCostItem',
        { eventId, category: newCategory.trim(), cost: costValue },
        { headers: { authorization: token } }
      );

      if (response.data.status) {
        setCostItems(response.data.items);
        setNewCategory('');
        setNewCost('');
      }
    } catch (err) {
      console.error('Failed to add cost item:', err);
    }
  };

  const deleteCostItem = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:8080/api/vendor/deleteCostItem/${eventId}/${itemId}`,
        { headers: { authorization: token } }
      );

      if (response.data.status) {
        setCostItems(response.data.items);
      }
    } catch (err) {
      console.error("Failed to delete cost item:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#161B22] text-white px-6 py-8 max-w-6xl mx-auto font-sans text-base">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Budget Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="space-y-4">
          <div className="p-4 bg-[#0d1117] rounded-lg shadow-md hover:shadow-blue-500/30 transition">
            <h2 className="text-lg font-semibold mb-1">Total Budget</h2>
            <p className="text-2xl font-bold text-blue-300">
              ${budget?.toLocaleString?.() || '0'}
            </p>
          </div>
          <div className="p-4 bg-[#0d1117] rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-1">Total Spent</h2>
            <p className="text-xl font-bold">${totalSpent.toLocaleString()}</p>
          </div>
          <div
            className={`p-4 rounded-lg shadow-md transition ${
              remaining < 0 ? 'bg-red-700 text-red-100' : 'bg-green-700 text-green-100'
            }`}
          >
            <h2 className="text-lg font-semibold mb-1">Remaining</h2>
            <p className="text-xl font-bold">${remaining.toLocaleString()}</p>
          </div>
        </div>

        <div className="p-4 bg-[#0d1117] rounded-lg shadow-md text-center flex flex-col justify-center items-center border border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Budget Utilization</h2>
          <ReactSpeedometer
            maxValue={budget || 100}
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

      <div className="mb-6 flex items-center gap-4">
        <input
          type="text"
          placeholder="Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="px-3 py-2 bg-[#0d1117] border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <input
          type="number"
          placeholder="Cost"
          value={newCost}
          onChange={(e) => setNewCost(e.target.value)}
          className="px-3 py-2 bg-[#0d1117] border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={addCostItem}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Add
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Cost Breakdown</h2>
        <ul className="divide-y divide-gray-700 rounded-lg overflow-hidden bg-[#0d1117] shadow-lg">
          {costItems.map(({ _id, category, cost }) => (
            <li
              key={_id}
              className="flex justify-between items-center px-4 py-3 hover:bg-[#21262d] transition-colors"
            >
              <span className="text-base text-white">{category}</span>
              <span className="font-medium text-base text-white flex items-center gap-4">
                ${cost.toLocaleString()}
                <button
                  onClick={() => deleteCostItem(_id)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Delete cost item"
                >
                  <FaTrash />
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
