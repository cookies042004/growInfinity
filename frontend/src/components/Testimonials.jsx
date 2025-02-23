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
        <h1 className="flex justify-center items-center text-2xl lg:text-5xl my-4 font-medium">
          <hr className="border-t-4 border-black my-4 w-[200px] h-[2px]" />{" "}
          &nbsp; Testimonals &nbsp;
          <hr className="border-t-4 border-black my-4 w-[200px] h-[2px]" />
        </h1>
        <h1 className="flex justify-center items-center text-xl lg:text-3xl lg:my-6">
          Words That Speak Louder Than Promises.
        </h1>
        <div className="grid sm:grid-cols-12 gap-5 max-w-[1280px] mx-auto">
          <div className="col-span-12 lg:col-span-6 flex justify-center">
            <div className="m-3 lg:m-5 px-5 lg:px-7 lg:py-10 font-roboto lg:pe-20 flex flex-col items-center ">
              <h1 className="text-2xl lg:text-4xl text-[#1A1A1A] my-4 font-medium">
                What our customers are saying us?
              </h1>
              <p className="text-[#1A1A1A] text-md lg:text-lg text-justify my-5 lg:pe-20">
                Don't just take our word for it—hear directly from those who
                have experienced our services. Our customers' stories reflect
                the dedication, expertise, and care we put into every
                transaction. Read their testimonials and see why we're the
                trusted choice for all your real estate needs.
              </p>
              <div className="flex justify-end lg:justify-start gap-10 w-full">
                <div className="flex-col mt-5 lg:mt-5">
                  <h3 className="font-medium text-[#1A1A1A] text-sm lg:text-2xl">
                    10m+
                  </h3>
                  <p className="text-xs lg:text-lg">Happy People</p>
                </div>
                <div className="flex-col mt-5 lg:mt-5">
                  <h3 className="font-medium text-[#1A1A1A] text-sm lg:text-2xl">
                    4.88
                  </h3>
                  <p className="text-xs lg:text-lg">Overall rating</p>
                  <div className="flex mt-3">
                    <StarIcon
                      sx={{ color: "#e7c874", fontSize: { xs: 15, lg: 25 } }}
                      size="small"
                    />
                    <StarIcon
                      sx={{ color: "#e7c874", fontSize: { xs: 15, lg: 25 } }}
                      size="small"
                    />
                    <StarIcon
                      sx={{ color: "#e7c874", fontSize: { xs: 15, lg: 25 } }}
                      size="small"
                    />
                    <StarIcon
                      sx={{ color: "#e7c874", fontSize: { xs: 15, lg: 25 } }}
                      size="small"
                    />
                    <StarIcon
                      sx={{ color: "#e7c874", fontSize: { xs: 15, lg: 25 } }}
                      size="small"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:my-4 lg:p-5 col-span-12 lg:col-span-6 flex justify-center testimonial-container pb-20 lg:h-[500px] shadow-[0px_0px_20px_rgba(0,0,0,0.3)]">
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

            <button
              ref={prevRef}
              className="absolute left-32 lg:left-40 bottom-[75px] lg:bottom-[35px] transform -translate-y-[-1px] lg:-translate-y-[1px] z-10 bg-gray-200 p-1 lg:p-3 rounded-full hover:bg-gray-300 transition"
            >
              <FaChevronLeft className="text-black" />
            </button>
            {testimonials && (
              <div className="relative">
                {/* Custom Navigation Arrows */}

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
                      <div className="py-8 px-10 lg:py-16 font-roboto lg:ps-26">
                        <div className="flex-col items-center gap-4 testimonial-item">
                          <div className="flex items-center gap-5">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-[50px] lg:w-[90px] rounded-[50%] h-[50px] lg:h-[90px] object-cover object-top"
                            />
                            <div className="flex-col justify-center gap-5">
                              <h5 className="font-medium text-[#1A1A1A] text-sm lg:text-lg">
                                {testimonial.name}
                              </h5>
                              <p className="text-sm text-[#1A1A1A]">
                                {testimonial.role}
                              </p>
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

                {/* Right Arrow */}
              </div>
            )}
            <button
              ref={nextRef}
              className="absolute right-32 lg:right-40 bottom-[75px] lg:bottom-[35px] transform -translate-y-[-1px] lg:-translate-y-[1px] z-10 bg-gray-200 p-1 lg:p-3 rounded-full hover:bg-gray-300 transition"
            >
              <FaChevronRight className="text-black" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
