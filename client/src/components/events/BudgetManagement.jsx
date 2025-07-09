import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { useParams } from "react-router-dom";

export default function BudgetManagement() {
    const { eventId } = useParams();

  const [budget, setBudget] = useState(0);
  const [costItems, setCostItems] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newCost, setNewCost] = useState("");
  const [vendorItemized, setVendorItemized] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch user budget and cost items on load
  useEffect(() => {
    const fetchUserBudget = async () => {
      if (!eventId) return;
      try {
        const res = await axios.get("http://localhost:8080/api/user/my-budget", {
          params: { eventId },
          headers: { authorization: token },
        });
        if (res.data.success) {
          setBudget(res.data.data.budget);
          setCostItems(res.data.data.items);
        }
      } catch (err) {
        console.error("Failed to load user budget:", err);
      }
    };

    fetchUserBudget();
  }, [eventId, token]);

  // Fetch vendor itemized budgets (your existing code)
  useEffect(() => {
    const fetchVendorItemizedBudgets = async () => {
      if (!eventId) return;
      try {
        const res = await axios.get(
          "http://localhost:8080/api/user/vendor-budgets",
          {
            params: { eventId },
            headers: { authorization: token },
          }
        );
        if (res.data.success && Array.isArray(res.data.data)) {
          setVendorItemized(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching itemized budgets:", error);
      }
    };

    fetchVendorItemizedBudgets();
  }, [eventId, token]);

  // Save user budget and cost items to DB
  const saveUserBudget = async (newBudget, newItems) => {
    try {
      await axios.post(
        "http://localhost:8080/api/user/my-budget",
        {
          eventId,
          budget: newBudget,
          items: newItems,
        },
        {
          headers: { authorization: token },
        }
      );
    } catch (error) {
      console.error("Failed to save user budget:", error);
    }
  };

  // When budget changes, save
  const handleBudgetChange = (val) => {
    setBudget(val);
    saveUserBudget(val, costItems);
  };

  // Add cost item and save
  const addCostItem = () => {
    if (!newCategory.trim() || !newCost) return;
    const costValue = parseFloat(newCost);
    if (isNaN(costValue) || costValue < 0) return;

    const updatedItems = [...costItems, { id: Date.now(), category: newCategory, cost: costValue }];
    setCostItems(updatedItems);
    setNewCategory("");
    setNewCost("");
    saveUserBudget(budget, updatedItems);
  };

  // Remove cost item and save
  const removeCostItem = (id) => {
    const updatedItems = costItems.filter((item) => item.id !== id);
    setCostItems(updatedItems);
    saveUserBudget(budget, updatedItems);
  };

  const totalSpent = costItems.reduce((sum, item) => sum + item.cost, 0);
  const remaining = budget - totalSpent;


  return (
    <div className="min-h-screen bg-[#161B22] text-white px-6 py-8 max-w-6xl mx-auto font-sans text-base">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Budget Management</h1>
        <button className="px-5 py-2 text-sm rounded border border-blue-500 text-blue-400 hover:text-white hover:bg-blue-500 transition-all duration-300 shadow-md hover:shadow-blue-500/40">
          Download Report
        </button>
      </div>

      {/* User Input for Budget */}
      <div className="mb-8">
        <label className="block mb-2 text-lg font-semibold" htmlFor="budget-input">
          Enter Your Total Budget:
        </label>
        <input
          type="number"
          id="budget-input"
          className="w-full max-w-xs p-2 rounded bg-[#0d1117] text-white border border-gray-600"
          value={budget}
          min={0}
          onChange={(e) => handleBudgetChange(Number(e.target.value))}
          placeholder="Enter total budget"
        />
      </div>

      {/* User Input to Add Cost Breakdown Items */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Add Cost Breakdown Item</h2>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md">
          <input
            type="text"
            placeholder="Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-1 p-2 rounded bg-[#0d1117] border border-gray-600 text-white"
          />
          <input
            type="number"
            placeholder="Cost"
            min="0"
            value={newCost}
            onChange={(e) => setNewCost(e.target.value)}
            className="w-28 p-2 rounded bg-[#0d1117] border border-gray-600 text-white"
          />
          <button
            onClick={addCostItem}
            className="px-5 py-2 bg-blue-600 rounded hover:bg-blue-700 transition text-white"
          >
            Add Item
          </button>
        </div>
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
              remaining < 0 ? "bg-red-700 text-red-100" : "bg-green-700 text-green-100"
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
            maxValue={budget || 1}
            value={totalSpent > budget ? budget : totalSpent}
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

      {/* Cost Breakdown List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Cost Breakdown</h2>
        {costItems.length === 0 ? (
          <p className="text-gray-400">No cost items added yet.</p>
        ) : (
          <ul className="divide-y divide-gray-700 rounded-lg overflow-hidden bg-[#0d1117] shadow-lg">
            {costItems.map(({ id, category, cost }) => (
              <li
                key={id}
                className="flex justify-between items-center px-4 py-3 hover:bg-[#21262d] transition-colors"
              >
                <span className="text-base">{category}</span>
                <span className="font-medium text-base">${cost.toLocaleString()}</span>
                <button
                  onClick={() => removeCostItem(id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                  title="Remove"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Vendor wise */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold mb-8">Vendor Itemized Breakdown</h2>

        {vendorItemized.length === 0 ? (
          <p className="text-gray-400">No itemized breakdown available.</p>
        ) : (
          vendorItemized.map(({ vendorId, name, category, items, totalBudget }) => {
            const totalSpent = items.reduce((sum, item) => sum + item.cost, 0);
            const remaining = totalBudget - totalSpent;

            return (
              <div
                key={vendorId}
                className="mb-10 bg-[#0d1117] rounded-xl shadow-lg border border-gray-700"
              >
                {/* Vendor Header */}
                <div className="p-5 border-b border-gray-600">
                  <h3 className="text-2xl font-bold text-white">{name}</h3>
                  <p className="text-sm text-gray-400">{category}</p>
                </div>

                {/* Budget Summary and Speedometer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5">
                  {/* Summary Boxes */}
                  <div className="space-y-4">
                    <div className="bg-[#0d1117] p-4 rounded-lg shadow-md hover:shadow-blue-500/30 transition border border-gray-700">
                      <h4 className="text-sm font-medium text-gray-300 mb-1">Total Budget</h4>
                      <p className="text-2xl font-semibold text-blue-300">
                        ${totalBudget.toLocaleString()}
                      </p>
                    </div>

                    <div className="bg-[#0d1117] p-4 rounded-lg shadow-md border border-gray-700">
                      <h4 className="text-sm font-medium text-gray-300 mb-1">Total Spent</h4>
                      <p className="text-xl font-semibold">${totalSpent.toLocaleString()}</p>
                    </div>

                    <div
                      className={`p-4 rounded-lg shadow-md border border-gray-700 ${
                        remaining < 0 ? "bg-red-700 text-red-100" : "bg-green-700 text-green-100"
                      }`}
                    >
                      <h4 className="text-sm font-medium mb-1">Remaining</h4>
                      <p className="text-xl font-semibold">${remaining.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Speedometer */}
                  <div className="flex justify-center items-center p-4 border border-gray-700 rounded-lg bg-[#0d1117]">
                    <ReactSpeedometer
                      maxValue={totalBudget}
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
                      needleTransitionDuration={2000}
                    />
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="px-5 pb-5">
                  <h4 className="text-lg font-semibold mb-3 mt-2">Cost Breakdown</h4>
                  <ul className="divide-y divide-gray-700 rounded-lg overflow-hidden bg-[#0d1117] shadow-md">
                    {items.map(({ category, cost }, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center px-4 py-3 hover:bg-[#21262d] transition-colors"
                      >
                        <span className="text-base">{category}</span>
                        <span className="text-green-300 font-medium">${cost.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
