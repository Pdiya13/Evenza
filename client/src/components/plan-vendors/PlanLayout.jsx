import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar1 from './PlanNavbar';
import { useParams } from 'react-router-dom';

const EventLayout = () => {
   const { eventId } = useParams();
  return (
    <div className="flex min-h-screen bg-[#161B22] font-poppins-custom">
      <Navbar1 eventId={eventId}/>
      <div className="flex-1 overflow-y-auto p-6 font-poppins-custom">
        <Outlet />
      </div>
    </div>
  );
};

export default EventLayout;
