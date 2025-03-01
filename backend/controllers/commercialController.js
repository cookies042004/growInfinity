const fs = require("fs");
const path = require("path");
const Property = require("../models/commercialProperty");
const Category = require("../models/category");
const Amenity = require("../models/amenity");
const slugify = require("slugify")

const getProperty = async (req, res) => {
    try {
        console.log("Fetching properties...");
        const properties = await Property.find();

        if (!properties.length) {
            return res.status(404).json({
                success: false,
                message: "No properties found!",
            });
        }   

        res.status(200).json({
            success: true,
            message: "Properties successfully fetched!",
            properties,
        });
    } catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message, // Log actual error
        });
    }
};




// Get By Name
const getByName = async (req, res) => {
    try {
        const property = await Property.findOne({
            slug: req.params.slug
        });
        if (!property) return res.status(404).json({
            message: "Property not found"
        });

        res.status(200).json({
            property
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
}

// Get Single Property
const getSingleProperty = async (req, res) => {
    try {
        const propertyId = req.params.id;
        const property = await Property.findById(propertyId)
            .populate("builder", "title")

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

const createProperty = async (req, res) => {
    try {
        const {
            title,
            description,
            unit,
            size,
            sizeUnit,
            price,
            location,
            address,
            projectStatus,
            projectSize,
            propertyType,
            builder,
            amenities,
        } = req.body;

        const image = [];
        const video = [];
        const dp = [];

        if (req.files['images']) {
            req.files['images'].forEach((file) => {
                image.push(file.path);
            });
        }

        if (req.files['video']) {
            req.files['video'].forEach((file) => {
                video.push(file.path);
            });
        }

        if (req.files['image']) {
            req.files['image'].forEach((file) => {
                dp.push(file.path);
            });
        }

        console.log("dp", dp);


        let formattedAmenities = amenities;
        if (typeof amenities === "string") {
            try {
                formattedAmenities = JSON.parse(amenities);
            } catch (error) {
                formattedAmenities = amenities.split(",").map((id) => id.trim());
            }
        }

        console.log("Formatted amenities:", formattedAmenities);

        const newProperty = new Property({
            title,
            unit,
            size,
            sizeUnit,
            price,
            location,
            description,
            address,
            image,
            video,
            dp,
            projectStatus,
            projectSize,
            propertyType,
            builder,
            amenities: formattedAmenities,
        });

        await newProperty.save();

        console.log("Property created successfully", newProperty);

        res.status(201).json({
            success: true,
            message: "Property created successfully",
            property: newProperty,
        });
    } catch (error) {
        console.error("Error is there:", error);
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
            projectStatus,
            projectSize,
            totalUnits,
            amenities
        } = req.body;

        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }

        const newImages = [];
        const newVideos = [];
        const newDp = [];

        if (req.files && req.files.images) {
            req.files.images.forEach((file) => newImages.push(file.path));
        }

        if (req.files && req.files.video) {
            req.files.video.forEach((file) => newVideos.push(file.path));
        }

        if (req.files && req.files.image) {
            newDp.push(req.files.image[0].path);
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

        if (newDp && property.dp && property.dp.length > 0) {
            property.dp.forEach((ele) => {
                const dpPath = path.join(__dirname, "../", ele);
                if (fs.existsSync(dpPath)) {
                    fs.unlinkSync(dpPath);
                }
            });
        }

        let formattedAmenities = amenities;
        if (typeof amenities === "string") {
            try {
                formattedAmenities = JSON.parse(amenities);
            } catch (error) {
                formattedAmenities = amenities.split(",").map((id) => id.trim());
            }
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
            image: newImages.length > 0 ? newImages : property.image,
            video: newVideos.length > 0 ? newVideos : property.video,
            projectStatus,
            projectSize,
            totalUnits,
            dp: newDp ? newDp : property.dp,
            amenities: formattedAmenities
        });

        await property.save();

        console.log("Property updated successfully", property);

        res.status(200).json({
            success: true,
            message: "Property updated successfully",
            property,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
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
        const {
            query
        } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Query parameter is required",
            });
        }

        // Use a regular expression for case-insensitive search
        const properties = await Property.find({
            $text: { $search: query }
        }).populate("category", "name").populate("amenities", "name type");
        

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
        res.status(200).json({
            success: true,
            totalProperties
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error
        });
    }
};

// Recent Property - Fetch latest 5 properties based on createdAt
const recentProperty = async (req, res) => {
    try {
        const recentProperties = await Property.find()
            .sort({
                createdAt: -1
            }) // Sort by createdAt in descending order (latest first)
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