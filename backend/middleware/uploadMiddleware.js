const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folderName = "uploads"; // Default folder

    if (req.originalUrl.includes("/api/v1/news")) {
      folderName = "news";
    } else if (req.originalUrl.includes("/api/v1/properties")) {
      folderName = "properties";
    } else if (req.originalUrl.includes("/api/v1/amenities")) {
      folderName = "amenities";
    } else if (req.originalUrl.includes("/api/v1/brochures")) {
      folderName = "brochures";
    } else if (req.originalUrl.includes("/api/v1/events")) {
      folderName = "events";
    } else if (req.originalUrl.includes("/api/v1/awards")) {
      folderName = "awards";
    } else if (req.originalUrl.includes("/api/v1/testimonials")) {
      folderName = "testimonials";
    }

    return {
      folder: folderName,
      resource_type: file.mimetype.startsWith("video/") ? "video" : "auto",
    };
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 100 }, // Limit files to 100MB
}).fields([
  { name: "images", maxCount: 10 },
  { name: "video", maxCount: 1 },
  { name: "pdf", maxCount: 1 },
  { name: "image", maxCount: 10 },
]);

module.exports = upload;
