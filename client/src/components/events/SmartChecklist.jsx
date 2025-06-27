import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';

function SmartChecklist() {
  const { id: eventId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [acceptedVendors, setAcceptedVendors] = useState([]);
  const [vendorTasks, setVendorTasks] = useState({});
  const [vendorInput, setVendorInput] = useState({});

  // 🔹 Fetch event-level checklist tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/api/event/checklist', {
          params: { eventId },
          headers: { authorization: token },
        });
        const checklist = res.data.checklist.map((task) => ({
          ...task,
          isEditing: false,
        }));
        setTasks(checklist);
      } catch (err) {
        console.error('Error fetching checklist items:', err);
      }
    };

    if (eventId) fetchTasks();
  }, [eventId]);

  // 🔹 Fetch accepted vendors
  useEffect(() => {
    const fetchAcceptedVendors = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/api/vendor/accepted-vendors', {
          params: { eventId },
          headers: { authorization: token },
        });
        if (res.data.status) {
          setAcceptedVendors(res.data.vendors);
        }
      } catch (err) {
        console.error('Error fetching accepted vendors:', err);
      }
    };

    if (eventId) fetchAcceptedVendors();
  }, [eventId]);

  // 🔹 Fetch vendor-specific tasks
  useEffect(() => {
    const fetchVendorTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const tasksMap = {};
        for (const vendor of acceptedVendors) {
          const res = await axios.get('http://localhost:8080/api/vendor/tasks', {
            params: { eventId, vendorId: vendor._id },
            headers: { authorization: token },
          });
          tasksMap[vendor._id] = res.data.tasks.map((t) => ({ ...t, isEditing: false }));
        }
        setVendorTasks(tasksMap);
      } catch (err) {
        console.error('Error fetching vendor tasks:', err);
      }
    };

    if (acceptedVendors.length > 0) fetchVendorTasks();
  }, [acceptedVendors, eventId]);

  // ✅ Event Checklist: Toggle, Add, Edit, Delete
  const toggleChecked = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:8080/api/event/checklist/${id}/toggle`,
        {},
        { headers: { authorization: token } }
      );
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? { ...task, checked: res.data.checked } : task))
      );
    } catch (err) {
      console.error('Error toggling item:', err);
    }
  };

  const addTask = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:8080/api/event/checklist`,
        { label: newTask, eventId },
        { headers: { authorization: token } }
      );
      setTasks([...tasks, { ...res.data.checklistItem, isEditing: false }]);
      setNewTask('');
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/event/checklist/${id}`, {
        headers: { authorization: token },
      });
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const enableEditing = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? { ...task, isEditing: true } : task))
    );
  };

  const handleLabelChange = (id, value) => {
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? { ...task, label: value } : task))
    );
  };

  const handleSave = async (id, label) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:8080/api/event/checklist/${id}/update`,
        { label },
        { headers: { authorization: token } }
      );
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? { ...task, isEditing: false } : task))
      );
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  // ✅ Vendor Tasks Functions
  const handleAddVendorTask = async (vendorId, label) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
            'http://localhost:8080/api/vendor/task',
            { eventId, vendorId, label }, // label is correct
            { headers: { authorization: token } }
        );

      setVendorTasks((prev) => ({
        ...prev,
        [vendorId]: [...(prev[vendorId] || []), { ...res.data.task, isEditing: false }],
      }));
    } catch (err) {
      console.error('Error adding vendor task:', err);
    }
  };

  const toggleVendorTask = async (taskId, vendorId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:8080/api/vendor/task/${taskId}/toggle`,
        {},
        { headers: { authorization: token } }
      );
      setVendorTasks((prev) => ({
        ...prev,
        [vendorId]: prev[vendorId].map((t) =>
          t._id === taskId ? { ...t, checked: res.data.checked } : t
        ),
      }));
    } catch (err) {
      console.error('Error toggling vendor task:', err);
    }
  };

  const updateVendorTaskLabel = async (taskId, vendorId, label) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:8080/api/vendor/task/${taskId}/update`,
        { label },
        { headers: { authorization: token } }
      );
      setVendorTasks((prev) => ({
        ...prev,
        [vendorId]: prev[vendorId].map((t) =>
          t._id === taskId ? { ...t, isEditing: false } : t
        ),
      }));
    } catch (err) {
      console.error('Error updating vendor task:', err);
    }
  };

  const deleteVendorTask = async (taskId, vendorId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/vendor/task/${taskId}`, {
        headers: { authorization: token },
      });
      setVendorTasks((prev) => ({
        ...prev,
        [vendorId]: prev[vendorId].filter((t) => t._id !== taskId),
      }));
    } catch (err) {
      console.error('Error deleting vendor task:', err);
    }
  };

  return (
    <div className="mt-12 p-6 rounded-xl shadow-xl border border-gray-700 bg-[#0D1117] font-poppins-custom">
      <h2 className="text-2xl font-extrabold text-white mb-4 tracking-wide">Smart Checklist</h2>
      <p className="text-sm text-gray-400 mb-6 leading-relaxed">
        This checklist was generated automatically when you created the event. You can now add, remove,
        or edit items.
      </p>

      {/* ✅ Global Tasks */}
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task._id} className="flex items-center justify-between bg-[#161B22] border border-gray-700 p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 w-full">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500 rounded accent-blue-600"
                checked={task.checked || false}
                onChange={() => toggleChecked(task._id)}
              />
              <input
                type="text"
                value={task.label}
                disabled={!task.isEditing}
                onChange={(e) => handleLabelChange(task._id, e.target.value)}
                className={`bg-transparent border-none outline-none text-white text-sm w-full ${!task.isEditing ? 'opacity-70 cursor-not-allowed' : ''}`}
              />
            </div>
            <div className="flex items-center gap-3 text-gray-400 text-xs font-medium ml-4">
              {task.isEditing ? (
                <button onClick={() => handleSave(task._id, task.label)} className="text-blue-300 hover:underline">Save</button>
              ) : (
                <button onClick={() => enableEditing(task._id)} className="text-green-300 hover:underline">Update</button>
              )}
              <button onClick={() => handleDelete(task._id)} className="text-red-300 hover:underline">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Add new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full bg-[#161B22] border border-gray-600 text-md text-white rounded-md px-4 py-2"
        />
        <button onClick={addTask} className="mt-3 flex items-center gap-2 bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 py-2 px-5 rounded-full">
          <FaPlus />
          Add Task
        </button>
      </div>

      {/* ✅ Vendor Tasks */}
      <div className="mt-10">
        <h3 className="text-xl text-white font-bold mb-4">Assign Tasks to Accepted Vendors</h3>
        {acceptedVendors.length === 0 ? (
          <p className="text-gray-400">No accepted vendors yet.</p>
        ) : (
          acceptedVendors.map((vendor) => (
            <div key={vendor._id} className="mb-6 p-4 bg-[#161B22] rounded-lg border border-gray-700">
              <h4 className="text-lg text-amber-300 font-semibold mb-2">{vendor.name} ({vendor.category})</h4>
              <input
                type="text"
                value={vendorInput[vendor._id] || ''}
                placeholder={`Assign task to ${vendor.name}`}
                onChange={(e) =>
                  setVendorInput((prev) => ({ ...prev, [vendor._id]: e.target.value }))
                }
                className="w-full bg-[#0D1117] border border-gray-600 text-white p-2 rounded"
              />
              <button
                className="mt-2 flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 py-1 px-4 rounded"
                onClick={() => {
                  const inputVal = vendorInput[vendor._id]?.trim();
                  if (inputVal) {
                    handleAddVendorTask(vendor._id, inputVal);
                    setVendorInput((prev) => ({ ...prev, [vendor._id]: '' }));
                  }
                }}
              >
                <FaPlus className="text-sm" />
                Add Task
              </button>

              <div className="mt-4 space-y-3">
                {(vendorTasks[vendor._id] || []).map((task) => (
                  <div key={task._id} className="flex items-center justify-between bg-[#0D1117] border border-gray-700 px-3 py-2 rounded">
                    <div className="flex items-center gap-3 w-full">
                      <input
                        type="checkbox"
                        checked={task.checked}
                        onChange={() => toggleVendorTask(task._id, vendor._id)}
                        className="form-checkbox h-5 w-5 text-green-400"
                      />
                      <input
                        type="text"
                        value={task.label}
                        disabled={!task.isEditing}
                        onChange={(e) => {
                          const newLabel = e.target.value;
                          setVendorTasks((prev) => ({
                            ...prev,
                            [vendor._id]: prev[vendor._id].map((t) =>
                              t._id === task._id ? { ...t, label: newLabel } : t
                            ),
                          }));
                        }}
                        className={`bg-transparent border-none outline-none text-white w-full ${!task.isEditing ? 'opacity-70 cursor-not-allowed' : ''}`}
                      />
                    </div>
                    <div className="flex gap-2 text-xs">
                      {task.isEditing ? (
                        <button onClick={() => updateVendorTaskLabel(task._id, vendor._id, task.label)} className="text-blue-300 hover:underline">Save</button>
                      ) : (
                        <button onClick={() => {
                          setVendorTasks((prev) => ({
                            ...prev,
                            [vendor._id]: prev[vendor._id].map((t) =>
                              t._id === task._id ? { ...t, isEditing: true } : t
                            ),
                          }));
                        }} className="text-green-300 hover:underline">Edit</button>
                      )}
                      <button onClick={() => deleteVendorTask(task._id, vendor._id)} className="text-red-300 hover:underline">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SmartChecklist;
