import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import quote from "../assets/img/SVG.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Testimonials.css";

import { CircularProgress } from "@mui/material";
import { useFetchData } from "../hooks/useFetchData";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import icons

export const Testimonials = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const apiUrl = `${process.env.BASE_URL}/api/v1/testimonials`;

  const { data, loading, error } = useFetchData(apiUrl);
  const testimonials = data?.testimonials || [];

  return (
    <>
      {/* Testimonial  */}
      <div className="bg-[#FFF8F6] py-2 lg:py-4 lg:px-16 px-10">
        <h1 className="flex justify-center items-center lg:text-4xl text-2xl font-bold py-4">
          <hr className="border-t-4 border-black w-[80px] h-[2px]" /> &nbsp;
          Testimonals &nbsp;
          <hr className="border-t-4 border-black w-[80px] h-[2px]" />
        </h1>

        <h1 className="flex justify-center items-center text-xl lg:text-xl">
          Words That Speak Louder Than Promises.
        </h1>

        <div className="grid sm:grid-cols-12 gap-5 max-w-[1280px] mx-auto">
        <div className="col-span-12 lg:col-span-6 flex justify-center">
          <div className="m-4 lg:m-6 px-6 lg:px-8 lg:py-12 font-roboto lg:pe-24 flex flex-col items-center text-center lg:text-left">
            <h1 className="text-2xl lg:text-3xl text-gray-900 font-semibold mb-6">
              What our customers are saying?
            </h1>
            <p className="text-gray-700 text-md lg:text-lg leading-relaxed">
              Don't just take our word for it—hear directly from those who have experienced our services. Our customers' stories reflect the dedication, expertise, and care we put into every transaction. Read their testimonials and see why we're the trusted choice for all your real estate needs.
            </p>
            <div className="flex justify-center lg:justify-start gap-10 mt-6">
              <div>
                <h3 className="font-semibold text-gray-900 text-xl lg:text-3xl">2k+</h3>
                <p className="text-gray-600 text-sm lg:text-lg">Happy People</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-xl lg:text-3xl">4.88</h3>
                <p className="text-gray-600 text-sm lg:text-lg">Overall rating</p>
                <div className="flex mt-3">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} sx={{ color: "#e7c874", fontSize: { xs: 15, lg: 25 } }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
          <div className="lg:my-12 lg:p-5 col-span-12 lg:col-span-6 flex justify-center testimonial-container pb-20 h-[250px] lg:h-[350px] shadow-[0px_0px_20px_rgba(0,0,0,0.3)]">
            {/* Left Arrow Button */}
            <button
              ref={prevRef}
              className="absolute top-1/2 -translate-y-1/2 -left-20 z-10 bg-gray-200 p-2 lg:p-4 rounded-full hover:bg-gray-300 transition"
            >
              <FaChevronLeft className="text-black text-lg lg:text-2xl" />
            </button>
            {loading && (
              <div className="flex items-center justify-center">
                <CircularProgress size="30px" />
              </div>
            )}
            {error && (
              <div className="flex items-center justify-center">
                <p>Something went wrong while loading the news.</p>
              </div>
            )}

            {testimonials && (
              <div className="relative">
                <div>
                  <Swiper
                    grabCursor={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      clickable: true,
                      dynamicBullets: true,
                    }}
                    navigation={{
                      prevEl: prevRef.current,
                      nextEl: nextRef.current,
                    }}
                    onSwiper={(swiper) => {
                      setTimeout(() => {
                        if (swiper.params.navigation) {
                          swiper.params.navigation.prevEl = prevRef.current;
                          swiper.params.navigation.nextEl = nextRef.current;
                          swiper.navigation.init();
                          swiper.navigation.update();
                        }
                      });
                    }}
                    className="mySwiper testimonial-swiper"
                  >
                    {testimonials.map((testimonial) => (
                      <SwiperSlide key={testimonial._id}>
                        <div className="py-2 lg:py-1 font-roboto lg:ps-10">
                          <div className="flex-col items-center gap-4 testimonial-item">
                            <div className="flex items-center gap-5">
                              <div className="border border-gray-400 p-1 lg:p-1 rounded-full">
                                <img
                                  src={testimonial.image}
                                  alt={testimonial.name}
                                  className="w-[50px] lg:w-[90px] rounded-[50%] h-[50px] lg:h-[90px] object-cover object-top"
                                />
                              </div>
                              <div className="flex-col justify-center gap-5">
                                <h6 className="text-[#1A1A1A] text-sm lg:text-xl">
                                  {testimonial.name}
                                </h6>
                                <h2 className="text-sm text-[#1A1A1A] font-bold">
                                  {testimonial.role}
                                </h2>
                              </div>
                              <div className="ms-32">
                                <img src={quote} alt="quote" />
                              </div>
                            </div>
                            <div className="mt-5">
                              <p className="lg:leading-10 text-sm lg:text-lg text-justify font-roboto font-medium text-[#1A1A1A]">
                                {testimonial.review.slice(0, 270) + "..."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            )}
            {/* Right Arrow Button */}
            <button
              ref={nextRef}
              className="absolute top-1/2 -translate-y-1/2 -right-20 z-10 bg-gray-200 p-2 lg:p-4 rounded-full hover:bg-gray-300 transition"
            >
              <FaChevronRight className="text-black text-lg lg:text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
