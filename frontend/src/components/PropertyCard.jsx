import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import { Button } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DoneIcon from "@mui/icons-material/Done";
import { Link } from "react-router-dom";
import { PropertyEnquiryForm } from "./PropertyEnquiryForm";
import './LatestNews.css'

export const PropertyCard = ({
  id,
  name,
  slug,
  image,
  location,
  builder,
  unit,
  size,
  sizeUnit,
  price,
  propertyType,
  customcategory,
  category
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  function toINRCr(amount) {
    // writing code for converting amount in lakhs and crores
    if (amount < 10000000) {
      return (amount / 100000).toFixed(1) + " Lac";
    } else {
      return (amount / 10000000).toFixed(1) + " Cr";
    }
  }

  // function for unit selection on the basis of sizeUnit
  function selectUnit(sizeUnit) {
    if (sizeUnit === "sqFt") {
      return size + " sq.ft.";
    } else if (sizeUnit === "yard") {
      return size + " sq.yd.";
    }
  }

  function divide(sizeUnit) {
    if (sizeUnit === "sqFt") {
      return Math.trunc(price / size) + " /  sq.ft.";
    } else if (sizeUnit === "yard") {
      return Math.trunc(price / size) + " / sq.yd.";
    }
  }

  return (
    <div className={` relative w-full border rounded-lg overflow-hidden bg-white shadow-md hover:shadow-red-700 transition-all duration-300 hover:scale-105  ${customcategory === "All" ? "cardAll" :""}`}>
      
      {/* Property Image */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="h-[230px] w-full object-contain"
        />
        {/* Property Type Badge */}
        <div className="absolute top-3 left-3">
          <Button
            size="small"
            variant="contained"
            color="success"
            sx={{ borderRadius: "4px", height: "24px", fontSize: "0.75rem" }}
            endIcon={<DoneIcon />}
          >
            {propertyType}
          </Button>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-5">
        {/* Title & Price */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-lg leading-tight text-gray-900">
              {name}
            </h3>
            <p className="text-gray-500 text-sm">By {builder}</p>
          </div>
          <p className="font-bold text-[#EB664E] text-xl">
            ₹{toINRCr(price)}*
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-600 mt-2">
          <LocationOnIcon className="text-blue-700 text-lg" />
          <span className="ml-2">{location}</span>  
        </div>

        {/* Additional Info */}
        <div className="mt-4 grid grid-cols-3 gap-3 text-sm text-gray-700">
          <div className="flex items-center">
            <HomeIcon className="text-blue-700 mr-1" />
            <span className="font-medium">{unit}</span>
          </div>
          <div className="flex items-center">
            <SquareFootIcon className="text-blue-700 mr-1" />
            <span className="font-medium">{selectUnit(sizeUnit)}</span>
          </div>
          <div className="flex items-center">
            <CurrencyRupeeIcon className="text-blue-700 mr-1" />
            <span className="font-medium">{divide(sizeUnit)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Link to={`/project/${slug}`} className="w-full sm:w-1/2">
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#03002e",
                color: "#fff",
                textTransform: "none",
                fontSize: "0.9rem",
                padding: "8px 0",
              }}
            >
              View Details
            </Button>
          </Link>
          <Button
            onClick={handleOpen}
            fullWidth
            variant="contained"
            color="success"
            startIcon={<CallIcon />}
            sx={{
              textTransform: "none",
              fontSize: "0.9rem",
              padding: "8px 0",
            }}
          >
            Enquiry
          </Button>
        </div>
      </div>

      {/* Property Enquiry Form */}
      <PropertyEnquiryForm id={id} handleClose={handleClose} open={open} />

      {customcategory === "All" && (
         <Link to={`/property/${category.toLowerCase().replace(/\s+/g, '-')}`}>
          <div className="card_overlay">
          <h3 className="category-title">{category} →</h3>
        </div>
         </Link>
      )}
    </div>
  );
};
