import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';

function SmartChecklist1() {
  const { eventId } = useParams();

  const [assignedTasks, setAssignedTasks] = useState([]);
  const [personalTasks, setPersonalTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  // FETCH TASKS
  useEffect(() => {
    fetchTasks();
  }, [eventId]);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:8080/api/vendor/${eventId}/vendor-tasks`,
        { headers: { authorization: token } }
      );

      if (res.data.status) {
        setAssignedTasks(res.data.assignedTasks || []);
        setPersonalTasks(res.data.personalTasks || []);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // TOGGLE TASK
  const toggleTask = async (taskId) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/event/checklist/task/toggle/${taskId}`,
        {},
        { headers: { authorization: token } }
      );

      const { isPersonal } = res.data;

      if (isPersonal) {
        setPersonalTasks(prev =>
          prev.map(t =>
            t._id === taskId ? { ...t, checked: !t.checked } : t
          )
        );
      } else {
        setAssignedTasks(prev =>
          prev.map(t =>
            t._id === taskId ? { ...t, checked: !t.checked } : t
          )
        );
      }
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  // ADD PERSONAL TASK
  const addPersonalTask = async () => {
    if (!newTask.trim()) {
      alert("Task cannot be empty");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/api/vendor/${eventId}/vendor-personal-task`,
        { label: newTask },
        { headers: { authorization: token } }
      );

      setPersonalTasks(prev => [res.data.task, ...prev]);
      setNewTask('');
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  //  DELETE TASK
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/event/checklist/task/${taskId}`,
        { headers: { authorization: token } }
      );

      setAssignedTasks(prev => prev.filter(t => t._id !== taskId));
      setPersonalTasks(prev => prev.filter(t => t._id !== taskId));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="mt-12 p-6 rounded-xl shadow-xl border border-gray-700 bg-[#0D1117] text-white">

      {/* LOADING */}
      {loading && <p className="text-gray-400 mb-4">Loading tasks...</p>}

      {/*ASSIGNED TASKS */}
      <h2 className="text-2xl font-bold mb-4">Assigned Tasks</h2>

      {assignedTasks.length === 0 && !loading && (
        <p className="text-gray-400 mb-4">No assigned tasks</p>
      )}

      {assignedTasks.map(task => (
        <div
          key={task._id}
          className="flex justify-between items-center bg-[#161B22] p-3 rounded mb-2"
        >
          <div className="flex gap-3 items-center">
            <input
              type="checkbox"
              checked={task.checked}
              onChange={() => toggleTask(task._id)}
              className="cursor-pointer"
            />
            <span className={task.checked ? "line-through text-gray-400" : ""}>
              {task.label}
            </span>
          </div>
        </div>
      ))}

      {/* PERSONAL TASKS */}
      <h2 className="text-2xl font-bold mt-8 mb-4">My Personal Checklist</h2>

      {/* INPUT */}
      <div className="flex gap-3 mb-4">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add your task..."
          className="flex-1 p-2 bg-[#161B22] border border-gray-600 rounded outline-none"
        />
        <button
          onClick={addPersonalTask}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded flex gap-2 items-center"
        >
          <FaPlus /> Add
        </button>
      </div>

      {personalTasks.length === 0 && !loading && (
        <p className="text-gray-400">No personal tasks yet</p>
      )}

      {personalTasks.map(task => (
        <div
          key={task._id}
          className="flex justify-between items-center bg-[#161B22] p-3 rounded mb-2"
        >
          <div className="flex gap-3 items-center">
            <input
              type="checkbox"
              checked={task.checked}
              onChange={() => toggleTask(task._id)}
              className="cursor-pointer"
            />
            <span className={task.checked ? "line-through text-gray-400" : ""}>
              {task.label}
            </span>
          </div>

          <button
            onClick={() => deleteTask(task._id)}
            className="text-red-400 hover:text-red-500 text-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default SmartChecklist1;