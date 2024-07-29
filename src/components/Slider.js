// src/Slider.js
import React, { useState, useEffect } from 'react';
import img1 from '../data/banner7.jpg';
import img2 from '../data/banner4.jpg';
import img3 from '../data/banner3.jpg';

const slides = [
  {
    id: 1,
    image: img1,
  },
  {
    id: 2,
    image: img2,
  },
  {
    id: 3,
    image: img3,
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative flex w-full transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide) => (
          <div key={slide.id} className="w-full h-[70vh] sm:h-[70vh] md:h-[70vh] lg:h-[70vh] xl:h-[70vh] flex-shrink-0">
            <img src={slide.image} className="block w-full h-full object-cover" alt={`Slide ${slide.id}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
