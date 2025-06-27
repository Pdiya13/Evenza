import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // ⬅️ Import useParams
import axios from 'axios';

function SmartChecklist() {
  const { eventId, vendorId } = useParams(); // ⬅️ Extract from URL
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!eventId || !vendorId) return;

    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/api/checklist/vendor-tasks', {
          params: { eventId, vendorId },
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
  }, [eventId, vendorId]);

  const toggleTask = async (taskId, currentChecked) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:8080/api/checklist/task/${taskId}/toggle`,
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
    <div>
      <h2>Vendor Checklist</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <input
              type="checkbox"
              checked={task.checked}
              onChange={() => toggleTask(task._id, task.checked)}
            />
            <span>{task.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SmartChecklist;
