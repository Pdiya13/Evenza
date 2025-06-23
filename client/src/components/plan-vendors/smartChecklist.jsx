import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

function SmartChecklist() {
    const initialTasks = [
        { text: 'Confirm venue availability', completed: false },
        { text: 'Send out invitations', completed: false },
        { text: 'Book catering service', completed: false },
        { text: 'Set up event branding material', completed: false },
        { text: 'Assign team roles', completed: false },
    ];

    const [tasks, setTasks] = useState(initialTasks);

    const toggleTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    return (
        <div className="mt-12 p-6 rounded-xl shadow-xl border border-gray-700 bg-[#0D1117] font-poppins-custom">
            <h2 className="text-2xl font-extrabold text-white mb-4 tracking-wide">Smart Checklist</h2>

            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                This checklist was generated automatically when you created the event. You can now add, remove, or edit items.
            </p>

            <ul className="space-y-4">
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        className="flex items-center justify-between bg-[#161B22] border border-gray-700 p-4 rounded-lg shadow-sm"
                    >
                        <div className="flex items-center gap-3 w-full">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(index)}
                                className="form-checkbox h-5 w-5 text-blue-500 rounded accent-blue-600"
                            />
                            <input
                                type="text"
                                value={task.text}
                                readOnly
                                className={`bg-transparent border-none outline-none text-sm font-medium tracking-wide w-full placeholder:text-gray-500 ${
                                    task.completed ? 'text-gray-500 line-through' : 'text-white'
                                }`}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SmartChecklist;
