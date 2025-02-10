const mongoose = require("mongoose");
const Category = require("../models/category");
const Amenity = require("../models/amenity");

const propertySchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    propertyType:{
      type:String,
      required:false // change it to true later
    },
    name: {
      type: String,
      required: true,
    },
    builder: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      // enum: ["1BHK", "2BHK", "3BHK", "4BHK", "5BHK"],
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    sizeUnit: {
      type: String,
      enum: ["sqFt", "yard"],
      required: true,
    },    
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    furnishType: {
      type: String,
      enum: ["Fully Furnished", "Semi Furnished", "Unfurnished"],
      required: true,
    },
    amenities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Amenity",
        required: true,
      },
    ],
    image: {
      type: [String],
      required: true, 
    },
    video: {
      type: [String]  ,
      required: false,
    }
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
