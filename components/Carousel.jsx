"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const Carousel = ({ items, name, visibleCount = 5 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const clonedItems = [...items, ...items]; // Clone the items array

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* <h2 className="text-2xl font-semibold text-center mb-4">{name}</h2> */}

      <div
        className="flex justify-center items-center transition-transform duration-1000 ease-in-out "
        style={{
          transform: `translateX(-${currentIndex * 100 / visibleCount}%)`,
        }}
      >
        {clonedItems.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 bg-white rounded-md p-4 mx-4"
            style={{
              width: `${100 / visibleCount}%`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={item.src}
              alt={item.name}
              width={150}
              height={100}
              className="rounded-md object-contain max-w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;