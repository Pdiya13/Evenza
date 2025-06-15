import React, { useRef } from 'react';
import Card from './Card';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Features() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
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
      {/* Center and add spacing between heading and scroll container */}
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
            title="Hybrid events"
            description="Merge the physical with the virtual"
            className="bg-gradient-to-br from-[#f7c8e0] to-[#d9a9f7]"
          />
          <Card
            title="Virtual events"
            description="Go beyond webinars and workshops"
            className="bg-gradient-to-br from-[#5c3bc4] to-[#6fcfe2]"
          />
          <Card
            title="In-person events"
            description="Keep it all together at the venue"
            className="bg-gradient-to-br from-[#61035f] to-[#2d0139]"
          />
          <Card
            title="Hybrid events"
            description="Merge the physical with the virtual"
            className="bg-gradient-to-br from-[#f7c8e0] to-[#d9a9f7]"
          />
          <Card
            title="Virtual events"
            description="Go beyond webinars and workshops"
            className="bg-gradient-to-br from-[#5c3bc4] to-[#6fcfe2]"
          />
          <Card
            title="In-person events"
            description="Keep it all together at the venue"
            className="bg-gradient-to-br from-[#61035f] to-[#2d0139]"
          />
          <Card
            title="Hybrid events"
            description="Merge the physical with the virtual"
            className="bg-gradient-to-br from-[#f7c8e0] to-[#d9a9f7]"
          />
          <Card
            title="Virtual events"
            description="Go beyond webinars and workshops"
            className="bg-gradient-to-br from-[#5c3bc4] to-[#6fcfe2]"
          />
          <Card
            title="In-person events"
            description="Keep it all together at the venue"
            className="bg-gradient-to-br from-[#61035f] to-[#2d0139]"
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
