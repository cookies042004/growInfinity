import React, { useRef } from "react";
import { CircularProgress } from "@mui/material";
import { useFetchData } from "../hooks/useFetchData";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import "./AwardComponent.css";

export const AwardComponent = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/awards`;
  const { data, loading, error } = useFetchData(apiUrl);
  const awards = data?.awards || [];

  const scrollContainer = useRef(null);

  const scroll = (direction) => {
    if (scrollContainer.current) {
      if (direction === "prev") {
        scrollContainer.current.scrollLeft -= 400;
      } else {
        scrollContainer.current.scrollLeft += 400;
      }
    }
  };

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
      {awards.length > 0 && (
        <section className="main">
          <div className="button-container transform -translate-y-[-80px] lg:-translate-y-[-150px] z-10 left-[130px] lg:left-[580px]">
            <button
              className="scroll-btn left-arrow"
              onClick={() => scroll("prev")}
            >
              ‹
            </button>
          </div>

          <div className="outer" ref={scrollContainer}>
            {awards.map((award, index) => (
              <div className="inner" key={index}>
                <div className="slide">
                  <img src={award.image} alt={`Award ${index + 1}`} />
                </div>
              </div>
            ))}
          </div>

          <div className="button-container transform -translate-y-[-80px] lg:-translate-y-[-150px] z-10 right-[130px] lg:right-[580px]">
            <button
              className="scroll-btn right-arrow"
              onClick={() => scroll("next")}
            >
              ›
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
