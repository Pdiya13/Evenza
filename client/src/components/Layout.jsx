import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="flex flex-row min-h-screen bg-[#161B22] font-poppins-custom">
      <Navbar />
      <div className="w-full p-6 font-poppins-custom overflow-x-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
