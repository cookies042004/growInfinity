const mongoose = require("mongoose");
const slugify = require("slugify")

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
    slug: {
      type: String,
      unique: true
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
    },
    dp:{
      type: [String],
      required: false,
    },
    projectSize:{
      type: String,
      required: false,
    },
    projectStatus:{
      type: String,
      required: false,
    },
    totalUnits:{
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);



propertySchema.pre("save", function (next) {
  this.slug = slugify(`${this.name}-${this.location}`, { lower: true, strict: true });
  next();
});


const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
