import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';

function SmartChecklist() {
    const { id: eventId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

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

        if (eventId) {
            fetchTasks();
        }
    }, [eventId]);

    const toggleChecked = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                `http://localhost:8080/api/event/checklist/${id}/toggle`,
                {},
                { headers: { authorization: token } }
            );
            setTasks((prev) =>
                prev.map((task) =>
                    task._id === id ? { ...task, checked: res.data.checked } : task
                )
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
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task._id === id ? { ...task, isEditing: true } : task
            )
        );
    };

    const handleLabelChange = (id, value) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task._id === id ? { ...task, label: value } : task
            )
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
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === id ? { ...task, isEditing: false } : task
                )
            );
        } catch (err) {
            console.error('Error updating task:', err);
        }
    };

    return (
        <div className="mt-12 p-6 rounded-xl shadow-xl border border-gray-700 bg-[#0D1117] font-poppins-custom">
            <h2 className="text-2xl font-extrabold text-white mb-4 tracking-wide">Smart Checklist</h2>

            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                This checklist was generated automatically when you created the event. You can now add, remove,
                or edit items.
            </p>

            <ul className="space-y-4">
                {tasks.map((task) => (
                    <li
                        key={task._id}
                        className="flex items-center justify-between bg-[#161B22] border border-gray-700 p-4 rounded-lg shadow-sm"
                    >
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
                                className={`bg-transparent border-none outline-none text-white text-sm font-medium tracking-wide w-full placeholder:text-gray-500 ${!task.isEditing ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                            />
                        </div>
                        <div className="flex items-center gap-3 text-gray-400 text-xs font-medium ml-4">
                            {task.isEditing ? (
                                <button
                                    className="px-3 py-1 rounded-full border border-blue-400/30 text-blue-300 bg-blue-400/10 hover:bg-blue-400/20"
                                    onClick={() => handleSave(task._id, task.label)}
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    className="px-3 py-1 rounded-full border border-green-400/30 text-green-300 bg-green-400/10 hover:bg-green-400/20"
                                    onClick={() => enableEditing(task._id)}
                                >
                                    Update
                                </button>
                            )}
                            <button
                                className="px-3 py-1 rounded-full border border-red-400/30 text-red-300 bg-red-400/10 hover:bg-red-400/20"
                                onClick={() => handleDelete(task._id)}
                            >
                                Delete
                            </button>
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
                    className="w-full bg-[#161B22] border border-gray-600 text-md text-white font-medium rounded-md px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 tracking-wide"
                />
                <button
                    className="mt-4 flex items-center gap-2 bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border-amber-300/30 font-semibold py-2 px-5 rounded-full shadow-sm transition duration-300 transform hover:-translate-y-0.5 active:scale-95"
                    onClick={addTask}
                >
                    <FaPlus className="text-sm" />
                    Add Task
                </button>
            </div>
        </div>
    );
}

export default SmartChecklist;
