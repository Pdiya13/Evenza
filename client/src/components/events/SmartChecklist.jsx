import React from 'react';
import { FaPlus } from 'react-icons/fa';
function SmartChecklist() {
    return (
        <div className="mt-12 p-6 rounded-xl shadow-xl border border-gray-700 bg-[#0D1117] font-poppins-custom">
            <h2 className="text-2xl font-extrabold text-white mb-4 tracking-wide ">Smart Checklist</h2>
            
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                This checklist was generated automatically when you created the event. You can now add, remove, or edit items.
            </p>

            <ul className="space-y-4">
                {[
                    'Confirm venue availability',
                    'Send out invitations',
                    'Book catering service',
                    'Set up event branding material',
                    'Assign team roles',
                ].map((task, index) => (
                    <li
                        key={index}
                        className="flex items-center justify-between bg-[#161B22] border border-gray-700 p-4 rounded-lg shadow-sm"
                    >
                        <div className="flex items-center gap-3 w-full">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-blue-500 rounded accent-blue-600"
                            />
                            <input
                                type="text"
                                defaultValue={task}
                                className="bg-transparent border-none outline-none text-white text-sm font-medium tracking-wide w-full placeholder:text-gray-500"
                            />
                        </div>
                        <div className="flex items-center gap-3 text-gray-400 text-xs font-medium ml-4">
                            <div className="flex items-center gap-2 text-xs font-semibold ml-4">
                                <button
                                    className="flex items-center gap-1 px-3 py-1 rounded-full border border-green-400/30 text-green-300 bg-green-400/10 hover:bg-green-400/20 transition duration-200"
                                    aria-label="Save"
                                >
                                    Save
                                </button>
                                <button
                                    className="flex items-center gap-1 px-3 py-1 rounded-full border border-red-400/30 text-red-300 bg-red-400/10 hover:bg-red-400/20 transition duration-200"
                                    aria-label="Delete"
                                >
                                    Delete
                                </button>
                            </div>

                        </div>
                    </li>
                ))}
            </ul>

            <div className="mt-6">
                <input
                    type="text"
                    placeholder="Add new task..."
                    className="w-full bg-[#161B22] border border-gray-600 text-md text-white font-medium rounded-md px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 tracking-wide"
                />
                <button
                    className="mt-4 flex items-center gap-2 bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border-amber-300/30 font-semibold py-2 px-5 rounded-full shadow-sm
             transition duration-300 transform hover:-translate-y-0.5 active:scale-95 "
                    aria-label="Add Task"
                >
                    <FaPlus className="text-sm" />
                    Add Task
                </button>
            </div>
        </div>
    );
}
export default SmartChecklist;
