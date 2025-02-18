import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper modules
import { Autoplay, Navigation, EffectCoverflow } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import "./AwardComponent.css";
import { useFetchData } from "../hooks/useFetchData";
import { CircularProgress } from "@mui/material";

export const AwardComponent = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/awards`;
  const { data, loading, error } = useFetchData(apiUrl);
  const awards = data?.awards || [];

  return (
    <div className="my-10">
      {loading && (
        <div className="col-span-12 flex min-h-[400px] items-center justify-center">
          <CircularProgress sx={{ color: "white" }} size="30px" />
        </div>
      )}
      {error && (
        <div className="flex justify-center">
          <p>Something went wrong while loading the awards.</p>
        </div>
      )}
      {awards && (
        <div >
          <Swiper
            effect={"coverflow"} // 3D Effect
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}  
            autoplay={{
              delay: 300, // Auto-slide every 3 seconds
              disableOnInteraction: false, // Keep autoplay even when interacting
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 100,
              depth: 100,
              modifier: 2,
              slideShadows: false,
            }}
            modules={[Autoplay, Navigation, EffectCoverflow]} // Enable modules
            className="awards-swiper"
          >
            {awards.map((award) => (
              <SwiperSlide key={award._id} className="award-slide">
                <img
                  src={award.image}
                  className="h-[300px] w-[300px] lg:h-[500px] lg:w-[450px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};
