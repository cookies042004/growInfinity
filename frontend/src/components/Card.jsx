import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PropertyCard } from "./PropertyCard";
import { useFetchData } from "../hooks/useFetchData";
import { CircularProgress } from "@mui/material";
import "./Card.css";

// Custom arrow components
const CustomPrevArrow = ({ onClick }) => (
  <button className="slick-prev" onClick={onClick}>
    ←
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button className="slick-next" onClick={onClick}>
    →
  </button>
);

export const Card = ({ category }) => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/property`;
  const { data, loading, error } = useFetchData(apiUrl);
  console.log(data, "lllllllllllllllllllll");
  const properties = data?.properties || [];
  // data?.properties?.filter(
  //   (property, index, self) => index === self.findIndex((p) => p._id === property._id)
  // ) || [];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 550, settings: { slidesToShow: 1 } },
    ],
  };

  const filteredProperties =
    category === "All"
      ? properties.reduce((acc, property) => {
          if (
            !acc.some(
              (item) => item?.category?.name === property?.category.name
            )
          ) {
            acc.push(property);
          }
          return acc;
        }, [])
      : properties.filter((property) => property?.category?.name === category);

  return (
    <div className="max-w-[1100px] mx-auto">
      {loading && (
        <div className="flex justify-center">
          <CircularProgress size="30px" />
        </div>
      )}
      {error && <p>Error: {error}</p>}

      <Slider {...settings}>
        {filteredProperties.map((property) => (
          <div key={property._id}>
            {console.log(property, ";;;;;;;;;;;;;;;;;;;;;;;;;;;;")}
            <PropertyCard
              customcategory={category} //only for all category
              category={property?.category?.name} //only for all category
              id={property._id}
              name={property.name}
              image={property.image[0]}
              location={property.location}
              builder={property.builder}
              unit={property.unit}
              size={property.size}
              sizeUnit={property.sizeUnit}
              price={property.price}
              propertyType={property.propertyType}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};
