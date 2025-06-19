import React, { useRef } from 'react';
import Card from './Card';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Features() {
  const scrollRef = useRef(null);
  console.log(scrollRef);
  
  const scroll = (direction) => {
    const { current } = scrollRef;
    console.log(scrollRef);
    if (current) {
      const scrollAmount = 320;
      if (direction === 'left') {
        current.scrollLeft -= scrollAmount;
      } else {
        current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <div className="py-10 px-5 bg-[#0D1117] text-white relative flex flex-col items-center gap-6">

      <h2 className="text-3xl font-bold text-center text-[#9FB1D1] font-lexend-giga-custom">
        The Simplest Way To Host All Your Events
      </h2>

      <div className="relative w-[95vw] mt-16 font-poppins-custom">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white text-black rounded-full shadow-md hover:bg-gray-200"
          aria-label="Scroll Left"
        >
          <FaChevronLeft />
        </button>

        <div
          ref={scrollRef}
          className="flex flex-nowrap space-x-8 overflow-x-auto scrollbar-hide px-10 scroll-smooth"
        >

          <Card
            title="Virtual events"
            description="Go beyond webinars and workshops"
            className="bg-gradient-to-br from-indigo-800 via-purple-900 to-indigo-900"
          />

          <Card
            title="Virtual events"
            description="Go beyond webinars and workshops"
            className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950"
          />

          <Card
            title="In-person events"
            description="Keep it all together at the venue"
            className="bg-gradient-to-br from-rose-800 via-rose-900 to-rose-950"
          />

          <Card
            title="Networking"
            description="Connect with vendors and clients"
            className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950"
          />
          {/* 
          <Card
            title="Workshops"
            description="Engage your audience meaningfully"
            className="bg-gradient-to-br from-cyan-800 via-cyan-900 to-cyan-950"
          /> */}

          <Card
            title="Celebrations"
            description="Make memories that last forever"
            className="bg-gradient-to-br from-yellow-800 via-yellow-900 to-yellow-950"
          />

        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white text-black rounded-full shadow-md hover:bg-gray-200"
          aria-label="Scroll Right"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Features;
