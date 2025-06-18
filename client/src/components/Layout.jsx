import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-[#161B22] font-poppins-custom">
      <Navbar />
      <div className="flex-1 overflow-y-auto p-6 font-poppins-custom">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
