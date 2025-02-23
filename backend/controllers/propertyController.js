const fs = require("fs");
const path = require("path");
const Property = require("../models/property");
const Category = require("../models/category");
const Amenity = require("../models/amenity");
const slugify = require("slugify")

// Get all Properties
const getProperty = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("category", "name")
      .populate("amenities", "name type");

    res.status(200).json({
      success: true,
      message: "Property successfully fetched!",
      properties,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      messsage: "Internal Server Error",
      error,
    });
  }
};

// Get By Name
const getByName = async(req,res) => {
  try {
    const property = await Property.findOne({ slug: req.params.slug });
    if (!property) return res.status(404).json({ message: "Property not found" });

    res.status(200).json({ property });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

// Get Single Property
const getSingleProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId)
      .populate("category", "name")
      .populate("amenities", "name type image");

    if (!property) {
      res.status(404).json({
        success: false,
        message: "Property not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property successfully found!",
      property,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

// Create a property
const createProperty = async (req, res) => {
  try {
    const {
      category,
      propertyType,
      name,
      builder,
      unit,
      size,
      sizeUnit,
      price,
      location,
      description,
      address,
      furnishType,
      amenities,
      projectStatus,
      projectSize,
      totalUnits
    } = req.body;

    const image = [];
    const video = [];
    const dp = [];

    if(req.files['images']){
      req.files['images'].forEach((file) => {
        image.push(file.path);
      })
    }

    if(req.files['video']){
      req.files['video'].forEach((file) => {
        video.push(file.path);
      })
    }

    if(req.files['image']){
      req.files['image'].forEach((file) => {
        dp.push(file.path);
      })
    }

    console.log("dp", dp);

    // const propertyImages = req.files.propertyImages.map((file) => file.path);
    // const brochure = req.files.brochure[0].path;

    const newProperty = new Property({
      category,
      propertyType, 
      name,
      builder,
      unit,
      size,
      sizeUnit,
      price,
      location,
      description,
      address,
      furnishType,
      amenities,
      image,
      video,
      dp,
      projectStatus,
      projectSize,
      totalUnits
    });

    await newProperty.save();

    console.log("Property created successfully", newProperty);

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      property: newProperty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Update a Property
const updateProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;

    const {
      category,
      name,
      propertyType,
      builder,
      unit,
      size,
      sizeUnit,
      price,
      location,
      description,
      address,
      furnishType,
      amenities,
    } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    const newImages = [];
    const newVideos = [];

    if (req.files && req.files.images) {
      req.files.images.forEach((file) => newImages.push(file.path));
    }

    if(req.files && req.files.video){
      req.files.video.forEach((file) => newVideos.push(file.path));
    }

    if (newImages.length > 0 && property.image && property.image.length > 0) {
      property.image.forEach((ele) => {
        const imagePath = path.join(__dirname, "../", ele);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }

    if (newVideos.length > 0 && property.video && property.video.length > 0) {
      property.video.forEach((ele) => {
        const videoPath = path.join(__dirname, "../", ele);
        if (fs.existsSync(videoPath)) {
          fs.unlinkSync(videoPath);
        }
      });
    }

    // Update property details
    Object.assign(property, {
      category,
      propertyType,
      name,
      builder,
      unit,
      size,
      sizeUnit,
      price,
      location,
      description,
      address,
      furnishType,
      amenities,
      image: newImages.length > 0 ? newImages : property.image,
      video: newVideos.length > 0 ? newVideos : property.video,
    });

    await property.save();

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      property,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// Delete a property
const deleteProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;

    // Find the property by ID
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Delete the brochure if it exists
    // const brochurePath = path.join(__dirname, "../", property.brochure);
    // if (property.brochure && fs.existsSync(brochurePath)) {
    //   fs.unlinkSync(brochurePath);
    // }

    // Delete property images if they exist
    if (property.image && property.image.length > 0) {
      property.image.forEach((ele) => {
        const imagePath = path.join(__dirname, "../", ele);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }

    // Delete the property from the database
    await Property.findByIdAndDelete(propertyId);

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Property and associated files deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Search Property
const searchProperty = async (req, res) => {
  console.log("Search Property Request:", req.query);
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query parameter is required",
      });
    }

    // Use a regular expression for case-insensitive search
    const searchRegex = new RegExp(query, "i");

    const properties = await Property.find({
      $or: [
        { name: searchRegex },
        { location: searchRegex },
        { address: searchRegex },
        { city: searchRegex },
        { state: searchRegex },
      ],
    })
      .populate("category", "name")
      .populate("amenities", "name type");

    if (properties.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No properties found matching your search.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Properties successfully fetched!",
      properties,
    });
  } catch (error) {
    console.log("Error in searchProperty:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

// Count number of Property
const getTotalProperties = async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments({}); // Assuming you are using MongoDB
    res.status(200).json({ success: true, totalProperties });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Recent Property - Fetch latest 5 properties based on createdAt
const recentProperty = async (req, res) => {
  try {
    const recentProperties = await Property.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order (latest first)
      .limit(6); // Limit to 5 properties

    if (recentProperties.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No recent properties found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recent properties fetched successfully!",
      properties: recentProperties,
    });
  } catch (error) {
    console.log("Error in recentProperty:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

module.exports = {
  getProperty,
  getSingleProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  searchProperty,
  getTotalProperties,
  recentProperty,
  getByName
};
