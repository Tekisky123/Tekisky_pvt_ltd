import React, { useState, useEffect } from 'react';
import mobileimg1 from "../images/slider/WhatsApp Image 2024-05-03 at 14.53.07_994d1b2f.jpg";
import mobileimg2 from "../images/slider/WhatsApp Image 2024-05-03 at 14.53.07_e7c0ec26.jpg";

const smallScreenImages = [
  {
    title: 'Mobile Screen Slide 1',
    imageUrl: mobileimg1,
  },
  {
    title: 'Mobile Screen Slide 2',
    imageUrl: mobileimg2,
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isBigScreen, setIsBigScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsBigScreen(window.innerWidth > 768);
    };

    // Call handleResize once to set initial screen size
    handleResize();

    // Add event listener to handle screen size changes
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Slide interval only for big screens
    if (!isBigScreen) {
      const intervalId = setInterval(() => {
        setCurrentSlide(prevSlide => (prevSlide + 1) % smallScreenImages.length);
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, [isBigScreen]);

  return (
    <>
      {!isBigScreen && (
        <div className="relative w-full mt-5 overflow-hidden slider-images">
          <div
            className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {smallScreenImages.map((slide, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0"
                style={{ flex: '0 0 100%' }}
              >
                <div className="w-full flex items-center justify-center">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    width={300}
                    height={500}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Slider;
