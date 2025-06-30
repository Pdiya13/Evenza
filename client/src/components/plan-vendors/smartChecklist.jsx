import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SmartChecklist1() {
  const { eventId } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:8080/api/vendor/${eventId}/vendor-tasks`, {
          headers: { authorization: token },
        });
        if (res.data.status) {
          setTasks(res.data.tasks);
        }
      } catch (err) {
        console.error('Failed to fetch vendor tasks:', err);
      }
    };

    fetchTasks();
  }, [eventId]);

  const toggleTask = async (taskId, currentChecked) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:8080/api/event/checklist/task/toggle/${taskId}`,
        {},
        { headers: { authorization: token } }
      );
      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, checked: !currentChecked } : task
        )
      );
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  };

  return (
    <div className="mt-12 p-6 rounded-xl shadow-xl border border-gray-700 bg-[#0D1117] font-poppins-custom">
      <h2 className="text-2xl font-extrabold text-white mb-4 tracking-wide">Vendor Checklist</h2>
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task._id} className="flex items-center justify-between bg-[#161B22] border border-gray-700 p-3 rounded-md">
            <div className="flex items-center gap-3 w-full">
              <input
                type="checkbox"
                checked={task.checked}
                onChange={() => toggleTask(task._id, task.checked)}
                className="form-checkbox h-5 w-5 text-blue-400"
              />
              <span className="text-white">{task.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SmartChecklist1;
