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
    <div className="grid sm:grid-cols-12 gap-4">
      {/* Main Image Slider */}
      <div className="lg:col-span-8 relative">
        <div className="relative w-full border rounded-xl overflow-hidden transition transform duration-500 hover:scale-105">
          <div className="relative overflow-hidden h-[280px] md:h-[350px] lg:h-[402px]">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0"
                  style={{ flex: "0 0 100%" }}
                >
                  <img
                    src={image}
                    className="block h-[280px] md:h-[350px] lg:h-[400px] w-full rounded-xl shadow-lg object-contain cursor-pointer"
                    alt={`Slide ${index + 1}`}
                    onClick={() => openModal(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Side Thumbnail Preview */}
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

      {/* Image Modal */}
      {isModalOpen && modalImageIndex !== null && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
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
