import React, { useEffect, useState } from "react";

const Carousel = ({ galleryImages }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(null);
  const [isExpanded,setIsExpanded] = useState(false);

  useEffect(() => {
    if(isExpanded){
      document.body.style.overflow = "hidden"
    }
    else{
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow =  "auto"
    }
  },[isExpanded])

  // Handle next slide
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  };

  // Handle previous slide
  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  // Open modal with selected image
  const openModal = (index) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
    setIsExpanded(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageIndex(null);
    setIsExpanded(false);
  };

  // Modal Next Slide
  const nextModalSlide = (e) => {
    e.stopPropagation(); // Prevent closing modal when clicking the button
    setModalImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  };

  // Modal Previous Slide
  const prevModalSlide = (e) => {
    e.stopPropagation();
    setModalImageIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="grid sm:grid-cols-12 gap-4"> 
      {/* Main Carousel */}
      <div className="lg:col-span-8 relative">
        <div className="relative w-full border rounded-xl overflow-hidden transition transform duration-500 hover:scale-105">
          <div className="relative overflow-hidden h-[280px] md:h-[350px] lg:h-[402px]">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {galleryImages.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0" style={{ flex: "0 0 100%" }}>
                  <img
                    src={image}
                    className="block h-[28px] md:h-[350px] lg:h-[400px] w-full rounded-xl shadow-lg object-contain cursor-pointer"
                    alt={`Slide ${index + 1}`}
                    onClick={() => openModal(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Slider Controls
          <button
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg z-30"
            onClick={prevSlide}
          >
            ◀
          </button>
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg z-30"
            onClick={nextSlide}
          >
            ▶
          </button> */}
        </div>
      </div>

      {/* Side Thumbnails */}
      <div className="hidden rounded-xl lg:block lg:col-span-4">
        <div className="flex flex-col gap-3 border rounded-xl">
          <img
            src={galleryImages[(activeIndex + 1) % galleryImages.length]}
            className="w-full h-[195px] rounded-xl object-contain cursor-pointer transition transform duration-500"
            alt="Next slide preview"
            onClick={() => openModal((activeIndex + 1) % galleryImages.length)}
          />

          <div className="relative">
            <img
              src={galleryImages[galleryImages.length - 1]}
              className="w-full h-[195px] rounded-xl object-cover cursor-pointer"
              alt="Carousel slide"
              onClick={() => openModal(galleryImages.length - 1)}
            />
            <div className="absolute rounded-xl inset-0 bg-black bg-opacity-40 backdrop-blur-md flex items-center justify-center">
              <p className="text-white text-xl font-semibold">
                +{galleryImages.length - 1} Photos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Image Expansion */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative p-4">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 bg-white text-black p-2 rounded-full shadow-lg"
              onClick={closeModal}
            >
              ✖
            </button>

            {/* Modal Image */}
            <img
              src={galleryImages[modalImageIndex]}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              alt="Expanded"
            />

            {/* Modal Navigation Buttons */}
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg"
              onClick={prevModalSlide}
            >
              ◀
            </button>
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg"
              onClick={nextModalSlide}
            >
              ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
