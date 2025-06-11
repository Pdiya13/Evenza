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
    <div className="py-10 px-5 bg-gray-100 relative">
      <h2 className="text-3xl font-bold text-center mb-8">Our Key Features</h2>

      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-200"
        aria-label="Scroll Left"
      >
        <FaChevronLeft />
      </button>

      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide px-4 scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        <Card
          title="Custom Event Planning"
          description="Tailored planning for weddings, parties, and corporate events."
        />
        <Card
          title="Creative Design"
          description="Innovative themes and decoration ideas to wow your guests."
        />
        <Card
          title="Venue Management"
          description="We handle bookings, layout, and venue logistics."
        />
        <Card
          title="Entertainment Setup"
          description="From DJs to live performers, we handle all entertainment."
        />
        <Card
          title="Catering Coordination"
          description="Delicious menus designed and managed to fit your theme."
        />
        <Card
          title="On-site Coordination"
          description="Our team ensures everything runs smoothly on the event day."
        />
      </div>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-200"
        aria-label="Scroll Right"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

export default Features;
