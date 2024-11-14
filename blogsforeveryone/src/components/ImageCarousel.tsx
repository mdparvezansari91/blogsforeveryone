// components/ImageCarousel.tsx

import { useEffect, useRef, useState, useCallback } from 'react';
import Image, { StaticImageData } from 'next/image';

interface ImageCarouselProps {
  images: StaticImageData[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(handleNext, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [handleNext]); // Include handleNext in the dependency array

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        ref={carouselRef}
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full flex-shrink-0">
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              layout="responsive" // Use layout prop if needed
              width={500} // Set width as needed
              height={300} // Set height as needed
            />
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-200"
        onClick={handlePrev}
      >
        &#10094; {/* Left Arrow */}
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-200"
        onClick={handleNext}
      >
        &#10095; {/* Right Arrow */}
      </button>
    </div>
  );
};

export default ImageCarousel;