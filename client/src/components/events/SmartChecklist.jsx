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

    const [personalTasks, setPersonalTasks] = useState([]);
    const [newPersonalTask, setNewPersonalTask] = useState('');


useEffect(() => {
  const fetchPersonalTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/api/checklist/personal/tasks', {
        headers: { authorization: token },
      });
      setPersonalTasks(res.data.tasks.map(task => ({ ...task, isEditing: false })));
    } catch (err) {
      console.error('Error fetching personal tasks:', err);
    }
  };
  fetchPersonalTasks();
}, []);

const togglePersonalTask = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post(
      `http://localhost:8080/api/checklist/task/${id}/toggle`,
      {},
      { headers: { authorization: token } }
    );
    setPersonalTasks((prev) =>
      prev.map((task) => (task._id === id ? { ...task, checked: res.data.checked } : task))
    );
  } catch (err) {
    console.error('Error toggling personal task:', err);
  }
};

const addPersonalTask = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post(
      'http://localhost:8080/api/checklist/personal/task',
      { label: newPersonalTask },
      { headers: { authorization: token } }
    );

    if (res.data.status) {
      setPersonalTasks([...personalTasks, { ...res.data.task, isEditing: false }]);
      setNewPersonalTask('');
    } else {
      console.error('Server responded with error:', res.data.message);
    }
  } catch (err) {
    console.error('Error adding personal task:', err.response?.data || err.message);
  }
};


const deletePersonalTask = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:8080/api/checklist/task/${id}`, {
      headers: { authorization: token },
    });
    setPersonalTasks((prev) => prev.filter((task) => task._id !== id));
  } catch (err) {
    console.error('Error deleting personal task:', err);
  }
};

const updatePersonalTask = async (id, label) => {
  try {
    const token = localStorage.getItem('token');
    await axios.post(
      `http://localhost:8080/api/checklist/task/${id}/update`,
      { label },
      { headers: { authorization: token } }
    );
    setPersonalTasks((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, isEditing: false } : task
      )
    );
  } catch (err) {
    console.error('Error updating task:', err);
  }
};

  useEffect(() => {
    const fetchAcceptedVendors = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/api/checklist/accepted-vendors', {
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


  useEffect(() => {
    const fetchVendorTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const tasksMap = {};
        for (const vendor of acceptedVendors) {
          const res = await axios.get('http://localhost:8080/api/checklist/tasks', {
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


  const handleAddVendorTask = async (vendorId, label) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
            'http://localhost:8080/api/checklist/task',
            { eventId, vendorId, label },
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
        `http://localhost:8080/api/checklist/task/${taskId}/toggle`,
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
        `http://localhost:8080/api/checklist/task/${taskId}/update`,
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
      await axios.delete(`http://localhost:8080/api/checklist/task/${taskId}`, {
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

     
      <div className="mt-10">
  <h3 className="text-xl text-white font-bold mb-4">Personal Checklist</h3>
  <ul className="space-y-3">
    {personalTasks.map((task) => (
      <li key={task._id} className="flex items-center justify-between bg-[#161B22] border border-gray-700 p-3 rounded-md">
        <div className="flex items-center gap-3 w-full">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-400"
            checked={task.checked}
            onChange={() => togglePersonalTask(task._id)}
          />
          <input
            type="text"
            value={task.label}
            disabled={!task.isEditing}
            onChange={(e) =>
              setPersonalTasks((prev) =>
                prev.map((t) =>
                  t._id === task._id ? { ...t, label: e.target.value } : t
                )
              )
            }
            className={`bg-transparent border-none text-white w-full ${
              !task.isEditing ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          />
        </div>
        <div className="flex gap-2 text-xs">
          {task.isEditing ? (
            <button
              className="text-blue-300"
              onClick={() => updatePersonalTask(task._id, task.label)}
            >
              Save
            </button>
          ) : (
            <button
              className="text-green-300"
              onClick={() =>
                setPersonalTasks((prev) =>
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
            onClick={() => deletePersonalTask(task._id)}
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
