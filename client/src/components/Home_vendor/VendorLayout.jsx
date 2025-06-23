import React from 'react';
import { Outlet } from 'react-router-dom';
import VendorNavbar from './VendorNavbar';

const VendorLayout = () => {
  return (
    <div className="flex flex-row min-h-screen bg-[#161B22] font-poppins-custom">
      <VendorNavbar />
      <div className="w-full p-6 overflow-x-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default VendorLayout;
