import React from "react";

const imagesRow1 = [
    "https://images.pexels.com/photos/22086472/pexels-photo-22086472.jpeg",
  "https://images.pexels.com/photos/50675/banquet-wedding-society-deco-50675.jpeg",
  "https://images.pexels.com/photos/30311728/pexels-photo-30311728.jpeg",
  "https://images.pexels.com/photos/16935899/pexels-photo-16935899.jpeg",
];

const imagesRow2 = [
    "https://images.pexels.com/photos/22086472/pexels-photo-22086472.jpeg",
  "https://images.pexels.com/photos/50675/banquet-wedding-society-deco-50675.jpeg",
  "https://images.pexels.com/photos/30311728/pexels-photo-30311728.jpeg",
  "https://images.pexels.com/photos/16935899/pexels-photo-16935899.jpeg",
];

const imagesRow3 = [
    "https://images.pexels.com/photos/22086472/pexels-photo-22086472.jpeg",
  "https://images.pexels.com/photos/50675/banquet-wedding-society-deco-50675.jpeg",
  "https://images.pexels.com/photos/30311728/pexels-photo-30311728.jpeg",
  "https://images.pexels.com/photos/16935899/pexels-photo-16935899.jpeg",
];

const ImageScroller = () => {
  return (
    <div className="bg-black py-5">
        <h1 className="text-[#9FB1D1] text-4xl text-center pb-5">Our Event Gallray</h1>
      <div className="grid grid-cols-3 gap-4 px-10">
        {/* Row 1 (scroll down) */}
        <div className="overflow-hidden h-[500px] rounded-lg">
          <div className="flex flex-col gap-4 animate-scroll-down">
            {[...imagesRow1, ...imagesRow1].map((img, idx) => (
              <img
                key={`row1-${idx}`}
                src={img}
                alt=""
                className="w-full h-48 object-cover rounded-md"
              />
            ))}
          </div>
        </div>

        {/* Row 2 (scroll up) */}
        <div className="overflow-hidden h-[500px] rounded-lg">
          <div className="flex flex-col gap-4 animate-scroll-up">
            {[...imagesRow2, ...imagesRow2].map((img, idx) => (
              <img
                key={`row2-${idx}`}
                src={img}
                alt=""
                className="w-full h-48 object-cover rounded-md"
              />
            ))}
          </div>
        </div>

        {/* Row 3 (scroll down) */}
        <div className="overflow-hidden h-[500px] rounded-lg">
          <div className="flex flex-col gap-4 animate-scroll-down">
            {[...imagesRow3, ...imagesRow3].map((img, idx) => (
              <img
                key={`row3-${idx}`}
                src={img}
                alt=""
                className="w-full h-48 object-cover rounded-md"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tailwind custom styles */}
      <style>
        {`
          @keyframes scroll-up {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }

          @keyframes scroll-down {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(0); }
          }

          .animate-scroll-up {
            animation: scroll-up 20s linear infinite;
          }

          .animate-scroll-down {
            animation: scroll-down 20s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default ImageScroller;
