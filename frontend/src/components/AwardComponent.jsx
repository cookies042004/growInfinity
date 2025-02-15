import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
// import "swiper/css/effect-cards";


// import required modules
// import { EffectCards, Autoplay } from "swiper/modules";
import "./AwardComponent.css";
import { useFetchData } from "../hooks/useFetchData";
import { CircularProgress } from "@mui/material";

export const AwardComponent = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/awards`;
  const { data, loading, error, refetch } = useFetchData(apiUrl);
  const awards = data?.awards || [];
  return (
    <div className="body my-10">
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
        <div className="bg-[#f6c6e8] py-5">
          <h1 className="text-center text-3xl lg:text-4xl text-black font-medium mb-6">
            Awards
          </h1>

          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 100,
              depth: 200,
              modifier: 1.5,
              slideShadows: false,
            }}
            navigation={true}
            modules={[EffectCoverflow, Autoplay, Navigation]}
            className="awards-swiper"
          >
            {awards.map((award, i) => (
              <SwiperSlide key={award._id} className="award-slide">
                <img
                  src={`${process.env.BASE_URL}/${award.image}`}
                  className="h-[300px] w-[300px] lg:h-[500px] lg:w-[450px] object-cover rounded-2xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};
