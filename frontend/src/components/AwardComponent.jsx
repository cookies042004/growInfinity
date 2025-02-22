import React from "react";
import { useRef } from "react";

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

  const scrollContainer = useRef(null);

  const scroll = (direction) => {
    if (direction === "prev") {
      scrollContainer.current.scrollLeft -= 200;
    } else {
      scrollContainer.current.scrollLeft += 200;
    }
  }



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
        // <div>
        //   <Swiper
        //     effect={"coverflow"}
        //     grabCursor={true}
        //     centeredSlides={true}
        //     slidesPerView={'auto'}
        //     loop={true}
        //     autoplay={{
        //       delay: 30000,
        //       disableOnInteraction: false,
        //     }}
        //     coverflowEffect={{
        //       rotate: 0,
        //       stretch: 100,
        //       depth: 100,
        //       modifier: 2,
        //       slideShadows: false,
        //     }}
        //     modules={[Autoplay, Navigation, EffectCoverflow]}
        //     className="awards-swiper"
        //   >
        //     {awards.map((award) => (
        //       <SwiperSlide key={award._id} className="award-slide">
        //         <img
        //           src={award.image}
        //           className="award-image" // Add a specific class for the image
        //         />
        //       </SwiperSlide>
        //     ))}
        //   </Swiper>
        // </div>
        <section className="main">
          <div className="outer">
            {awards.map((image, index) => (
              <div className="inner" key={index}>
                <div className="slide">
                  <img src={image.image} alt={`Slide ${index + 1}`} />
                </div>
              </div>
            ))}
          </div>

          <div className="button-container">
            <button className="scroll-btn" onClick={() => scroll("prev")}>‹ Prev</button>
            <button className="scroll-btn" onClick={() => scroll("next")}>Next ›</button>
          </div>
        </section>
      )}
    </div>
  );
};
