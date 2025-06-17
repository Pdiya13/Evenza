import React from 'react';
import {
    FaTachometerAlt,
    FaPlusCircle,
    FaClipboardList,
    FaChartBar,
    FaSignOutAlt,
    FaCalendar,
    FaSellcast,
    FaUser,
    FaPeopleArrows,
    FaPeopleCarry,
} from 'react-icons/fa';

function Navbar() {
    return (
        <div className="flex items-center h-[100vh]">

            <div className="group w-18 hover:w-52 transition-[width] duration-300 h-full bg-[#0D1117] mt-8 rounded-lg px-4 py-10 overflow-hidden">

                <ul className="text-white flex flex-col justify-center gap-8 text-base font-normal h-full">
                    <li className="hover:bg-[#F4F4F4] px-2 py-3 rounded-md hover:text-[#0D1117] flex items-center gap-3">
                        <div className="min-w-[20px] text-xl"><FaTachometerAlt /></div>
                        <span className="opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 whitespace-nowrap">
                            Dashboard
                        </span>
                    </li>
                     <li className="hover:bg-[#F4F4F4] px-2 pr-2 py-3 rounded-md hover:text-[#0D1117] flex items-center gap-3">
                        <div className="min-w-[20px] text-xl"><FaPeopleCarry /></div>
                        <span className="opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 whitespace-nowrap">
                            Vendors
                        </span>
                    </li>
                    <li className="hover:bg-[#F4F4F4] px-2 py-3 rounded-md hover:text-[#0D1117] flex items-center gap-3">
                        <div className="min-w-[20px] text-xl"><FaCalendar /></div>
                        <span className="opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 whitespace-nowrap">
                            Event Management
                        </span>
                    </li>
                    <li className="hover:bg-[#F4F4F4] px-2 py-3 rounded-md hover:text-[#0D1117] flex items-center gap-3">
                        <div className="min-w-[20px] text-xl"><FaSignOutAlt /></div>
                        <span className="opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 whitespace-nowrap">
                            Logout
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
