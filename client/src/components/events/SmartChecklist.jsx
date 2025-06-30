import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';

function SmartChecklist() {
  const { eventId } = useParams();
  const [personalTask, setPersonalTask] = useState([]);
  const [newPersonalTask, setNewPersonalTask] = useState('');
  const [acceptedVendors, setAcceptedVendors] = useState([]);
  const [vendorTasks, setVendorTasks] = useState({});
  const [vendorInput, setVendorInput] = useState({});

  useEffect(() => {
    async function fetchpersonaltask() {
      try {
        const res = await axios.get(`http://localhost:8080/api/event/checklist/task/personal/${eventId}`, {
          headers: { Authorization: localStorage.getItem('token') },
        });
        const tasksWithEditing = res.data.personalTask.map(task => ({
        ...task,
        isEditing: false,
      }));
      setPersonalTask(tasksWithEditing);
      } catch (err) {
        console.log(err);
      }
    }
    fetchpersonaltask();
  }, [eventId]);

  useEffect(() => {
    async function fetchVendors() {
      try {
        const res = await axios.get(`http://localhost:8080/api/event/acceptedvendors/${eventId}`, {
          headers: { Authorization: localStorage.getItem('token') },
        });
        console.log(res.data.acceptedVendors);
        setAcceptedVendors(res.data.acceptedVendors);
      } catch (err) {
        console.log(err);
      }
    }
    fetchVendors();
  }, [eventId]);

  useEffect(() => {
  async function fetchVendorTask() {
    const tasksObj = {};
    for (const vendor of acceptedVendors) {
      try {
        const res = await axios.get(`http://localhost:8080/api/event/checklist/task/vendor/${eventId}/${vendor._id}`, {
          headers: { Authorization: localStorage.getItem('token') },
        });
  
        const tasksWithEditing = (res.data.vendorTasks || []).map(task => ({
          ...task,
          isEditing: false,
        }));
        tasksObj[vendor._id] = tasksWithEditing;
      } catch (taskErr) {
        console.error(`Failed to fetch tasks for vendor ${vendor.name}:`, taskErr);
        tasksObj[vendor._id] = [];
      }
    }
    setVendorTasks(tasksObj);
  }
  if (Array.isArray(acceptedVendors) && acceptedVendors.length > 0) {
    fetchVendorTask();
  }
}, [acceptedVendors, eventId]);


  const toggleTask = async (taskId) => {
  try {
    console.log(taskId);
    const res = await axios.post(`http://localhost:8080/api/event/checklist/task/toggle/${taskId}`, {}, {
      headers: { Authorization: localStorage.getItem('token') },
    });

    const { isPersonal, vendorId, checked } = res.data;

    if (isPersonal) {
      setPersonalTask((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, checked } : task
        )
      );
    } else if (vendorId) {
      setVendorTasks((prev) => ({
        ...prev,
        [vendorId]: prev[vendorId].map((task) =>
          task._id === taskId ? { ...task, checked } : task
        ),
      }));
    }
  } catch (err) {
    console.log(err);
  }
};


  const addPersonalTask = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/api/event/checklist/task/personal/${eventId}`, {
        label: newPersonalTask,
      }, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setPersonalTask((prev) => [...prev, res.data.newTask]);
      setNewPersonalTask('');
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      console.log(taskId);
      await axios.post(`http://localhost:8080/api/event/checklist/task/delete/${taskId}`, {}, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setPersonalTask((prev) => prev.filter((t) => t._id !== taskId));
      setVendorTasks((prev) => {
        const updated = { ...prev };
        for (let vid in updated) {
          updated[vid] = updated[vid].filter((t) => t._id !== taskId);
        }
        return updated;
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateTask = async (taskId, label) => {
  try {
    const res = await axios.post(`http://localhost:8080/api/event/checklist/task/update/${taskId}`, { label }, {
      headers: { Authorization: localStorage.getItem('token') },
    });
    const updatedTask = res.data.newUpdatedTask;

    if (res.data.personal) {
      setPersonalTask((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...updatedTask, isEditing: false } : task
        )
      );
    } else {
      const vendorId = res.data.vendorId;
      setVendorTasks((prev) => ({
        ...prev,
        [vendorId]: prev[vendorId].map((task) =>
          task._id === taskId ? { ...updatedTask, isEditing: false } : task
        ),
      }));
    }
  } catch (err) {
    console.log(err);
  }
};


  const handleAddVendorTask = async (vendorId, label) => {
    try {
      const res = await axios.post(`http://localhost:8080/api/event/checklist/task/vendor/${eventId}/${vendorId}`, {
        label,
      }, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setVendorTasks((prev) => ({
        ...prev,
        [vendorId]: [...(prev[vendorId] || []), res.data.task],
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mt-12 p-6 rounded-xl shadow-xl border border-gray-700 bg-[#0D1117] font-poppins-custom">
      <h2 className="text-2xl font-extrabold text-white mb-4 tracking-wide">Smart Checklist</h2>
      <p className="text-sm text-gray-400 mb-6 leading-relaxed">
        This checklist was generated automatically when you created the event. You can now add, remove,
        or edit items.
      </p>

      <div className="mt-10">
        <h3 className="text-xl text-white font-bold mb-4">Personal Checklist</h3>
        <ul className="space-y-3">
          {personalTask && personalTask.map((task) => (
            <li key={task._id} className="flex items-center justify-between bg-[#161B22] border border-gray-700 p-3 rounded-md">
              <div className="flex items-center gap-3 w-full">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-400"
                  checked={task.checked}
                  onChange={() => toggleTask(task._id)}
                />
                <input
                  type="text"
                  value={task.label}
                  disabled={!task.isEditing}
                  onChange={(e) =>
                    setPersonalTask((prev) =>
                      prev.map((t) =>
                        t._id === task._id ? { ...t, label: e.target.value } : t
                      )
                    )
                  }
                  className={`bg-transparent border-none text-white w-full ${!task.isEditing ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                />
              </div>
              <div className="flex gap-2 text-xs">
                {task.isEditing ? (
                  <button
                    className="text-blue-300"
                    onClick={() => updateTask(task._id, task.label)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="text-green-300"
                    onClick={() =>
                      setPersonalTask((prev) =>
                        prev.map((t) =>
                          t._id === task._id ? { ...t, isEditing: true } : t
                        )
                      )
                    }
                  >
                    Edit
                  </button>
                )}
                <button
                  className="text-red-300"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Add new personal task..."
            value={newPersonalTask}
            onChange={(e) => setNewPersonalTask(e.target.value)}
            className="w-full sm:w-auto flex-1 bg-[#0D1117] border border-gray-600 text-white p-2 rounded"
          />
          <button
            onClick={addPersonalTask}
            className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 px-4 py-2 rounded"
          >
            <FaPlus />
            Add Task
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl text-white font-bold mb-4">Assign Tasks to Accepted Vendors</h3>
        {acceptedVendors && acceptedVendors.length === 0 ? (
          <p className="text-gray-400">No accepted vendors yet.</p>
        ) : (
          acceptedVendors && acceptedVendors.map((vendor) => (
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
                        onChange={() => toggleTask(task._id)}
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
                        <button onClick={() => updateTask(task._id, task.label)} className="text-blue-300 hover:underline">Save</button>
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
                      <button onClick={() => deleteTask(task._id)} className="text-red-300 hover:underline">Delete</button>
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
