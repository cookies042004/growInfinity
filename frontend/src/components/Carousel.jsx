import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = ({ galleryImages }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isExpanded ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isExpanded]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen) {
        if (e.key === "ArrowRight") {
          setModalImageIndex((prev) => (prev + 1) % galleryImages.length);
        } else if (e.key === "ArrowLeft") {
          setModalImageIndex((prev) =>
            prev === 0 ? galleryImages.length - 1 : prev - 1
          );
        } else if (e.key === "Escape") {
          closeModal(); // Close modal when Esc key is pressed
        }
      }
    };

    // Attach event listener when modal is open
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener when modal closes
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, galleryImages.length]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const openModal = (index) => {
    console.log("Opening modal for index:", index);
    setModalImageIndex(index);
    setIsModalOpen(true);
    setIsExpanded(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageIndex(null);
    setIsExpanded(false);
  };

  const nextModalSlide = (e) => {
    e.stopPropagation();
    setModalImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevModalSlide = (e) => {
    e.stopPropagation();
    setModalImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="grid gap-6">
      <div className="flex w-full relative gap-2 ">
        <div className="w-5/6 relative">
          <div className="overflow-hidden transition-transform duration-500">
            <img
              src={galleryImages[activeIndex]}
              className="block h-[310px] w-full object-cover cursor-pointer transition-transform duration-500 hover:scale-105"
              alt="Main"
              onClick={() => openModal(activeIndex)}
            />
          </div>
        </div>
        <div className="hidden rounded-xl lg:block w-2/4">
          <div className="flex flex-col gap-2.5 bg-white/90 backdrop-blur-lg">
            <div>
              <img
                src={galleryImages[(activeIndex + 1) % galleryImages.length]}
                className="w-full h-[150px] object-cover cursor-pointer  hover:scale-y-105 transition-transform duration-500"
                alt="Next"
                onClick={() =>
                  openModal((activeIndex + 1) % galleryImages.length)
                }
              />
            </div>

            <div className="relative cursor-pointer overflow-hidden">
              <img
                src={galleryImages[galleryImages.length - 1]}
                className="w-full h-[150px] blur-sm object-cover cursor-pointer  hover:scale-x-105 hover:scale-y-105 transition-transform duration-500 brightness-75"
                alt="More"
                onClick={() => openModal(galleryImages.length - 1)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center pointer-events-none">
                <p className="text-white text-3xl font-semibold">
                  +{galleryImages.length - 1} Photos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && modalImageIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-[1000]">
          {/* Background Overlay to ensure proper layout */}
          <div className="absolute inset-0 flex justify-center items-center">
            <motion.img
              key={modalImageIndex}
              src={galleryImages[modalImageIndex]}
              alt={`Image ${modalImageIndex + 1}`}
              className="w-full h-full object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevModalSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 p-3 rounded-full"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={nextModalSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 p-3 rounded-full"
          >
            <ChevronRight size={32} />
          </button>

          {/* Thumbnail Previews */}
          <div className="absolute bottom-8 right-8 flex gap-3">
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                className={`relative w-20 h-16 rounded-lg cursor-pointer overflow-hidden ${
                  modalImageIndex === index ? "border-2 border-white" : ""
                }`}
                whileHover={{ scale: 1.1 }}
                onClick={() => setModalImageIndex(index)}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>

          {/* Close Button */}
          <button
            className="absolute top-6 right-6 md:top-4 md:right-4 bg-white/70 p-3 rounded-full z-[60]"
            onClick={closeModal}
          >
            ✖
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel;
