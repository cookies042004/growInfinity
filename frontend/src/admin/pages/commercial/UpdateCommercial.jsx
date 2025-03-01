import React, { useState, useEffect, useRef } from "react";
import { AdminLayout } from "../../components/AdminLayout";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { useFetchData } from "../../../hooks/useFetchData";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";

export const UpdateCommercial = () => {
  document.title = "Update Property";
  const { id } = useParams();
  const [buttonLoading, setButtonLoading] = useState(false);
  // Fetching the property data by ID
  const { data, loading, error, refetch } = useFetchData(
    `${process.env.BASE_URL}/api/v1/commercial/${id}`
  );
  console.log("DATA IS", data?.property);

  const {
    data: amenitiesData,
    error: amenitiesError,
    loading: amenitiesLoading,
    refetch: refetchAmenities,
  } = useFetchData(`${process.env.BASE_URL}/api/v1/commercial-amenities`);

  const amenities = amenitiesData?.amenity || [];

  // State to manage form data
  const [formData, setFormData] = useState({
    propertyType: "",
    title: "",
    builder: "",
    unit: "",
    size: "",
    sizeUnit: "",
    price: "",
    location: "",
    address: "",
    description: "",
    projectSize: "",
    projectStatus: "",
    amenities: [],
  });

  // State to track uploaded images and brochure
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState(null);
  const [uploadedDpImage, setUploadedDpImage] = useState(null);
  const [selectAll, setSelectAll] = useState(false);

  // Ref to the file input element
  const imageInputRef = useRef();
  const videoInputRef = useRef();
  const dpInputRef = useRef();

  // Load property data into formData when property is fetched
  useEffect(() => {
    if (data?.property) {
      const property = data.property;
      setFormData({
        propertyType: property.propertyType || "", //PROPERTY TYPE ADDED HERE
        title: property.title || "",
        builder: property.builder || "",
        unit: property.unit || "",
        size: property.size || "",
        price: property.price || "",
        location: property.location || "",
        address: property.address || "",
        description: property.description || "",
        projectSize: property.projectSize || "",
        projectStatus: property.projectStatus || "",
        sizeUnit: property.sizeUnit || "",
        amenities: property.amenities || [],
      });
      setUploadedImages(property.images || []);
      // setUploadedVideos(property.video || null  );
      // setSizeUnit(property.sizeUnit);
      setUploadedDpImage(property.dp || null);
    }
  }, [data]);

  console.log(amenities);

  console.log("nothing", data.property?.amenities);
  console.log("data is", data.property);

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle select changes
  const handleSelectChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
  
    setFormData((prevFormData) => {
      const currentAmenities = Array.isArray(prevFormData.amenities) ? prevFormData.amenities : [];
  
      let updatedAmenities;
      
      if (name === "selectAll") {
        updatedAmenities = checked ? amenities.map((a) => a._id) : [];
      } else {
        updatedAmenities = checked
          ? [...currentAmenities, name] // Add checked amenity
          : currentAmenities.filter((id) => id !== name); // Remove unchecked amenity
      }
      
      setTimeout(() => {
        setSelectAll(updatedAmenities.length === amenities.length);
      }, 0);
  
      return { ...prevFormData, amenities: updatedAmenities };
    });
  };
  


  // radio button handler
  const handleRadioChange = (event, type) => {
    const { value } = event.target;

    const isSelectAll = value === "selectAll";

    const selectAllStateSetters = {
      societyAmenities: setSelectAllSociety,
      flatAmenities: setSelectAllFlat,
      locationAdvantages: setSelectAllLocation,
    };
    selectAllStateSetters[type](isSelectAll);

    setFormData({
      ...formData,
      [type]: isSelectAll
        ? amenities
            .filter((amenity) => amenity.type === getAmenityType(type))
            .map((amenity) => amenity._id)
        : [],
    });
  };

  // dynamic amenity type mapping
  const getAmenityType = (type) => {
    return type === "locationAdvantages"
      ? "location_advantages"
      : type.replace("Amenities", "_amenity");
  };

  // Handler for uploading images
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const maxSize = 2 * 1024 * 1024; // 2 MB

    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        toast.error(`Image size should be less than 2Mb.`);
        return false;
      }
      return true;
    });

    setUploadedImages((prevImages) => [...prevImages, ...validFiles]);
  };

  // Handler for video uplaoding
  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    let maxSize = 1024 * 1024 * 2; // 2Mb max

    if (file.size > maxSize) {
      toast.error(`Video size should be less than 2Mb`);
    } else {
      if (
        (file && file.type === "video/mp4") ||
        file.type === "video/webm" ||
        file.type === "video/ogg"
      ) {
        setUploadedVideos(file);
      } else {
        toast.error(`Invalid video file.`);
      }
    }
  };
  const handleDescriptionUpload = (event) => {
    const file = event.target.files[0];
    let maxSize = 1024 * 1024 * 2; // 2Mb max
    if (file.size > maxSize) {
      toast.error(`Dp size should be less than 2Mb`);
    } else {
      if (
        file &&
        (file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/jpg" ||
          file.type === "image/webp")
      ) {
        setUploadedDpImage(file);
      } else {
        toast.error(`Invalid image file.`);
      }
    }
  };

  const renderDescriptionPreview = () => {
    if (!uploadedDpImage || !(uploadedDpImage instanceof File)) return null; // Ensure it's a valid File

    return (
      <Box
        sx={{
          position: "relative",
          display: "inline-block",
          width: 100,
          height: 100,
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          "&:hover .delete-image": { opacity: 1 },
        }}
      >
        <img
          src={URL.createObjectURL(uploadedDpImage)}
          alt="Preview"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <IconButton
          className="delete-image"
          onClick={() => setUploadedDpImage(null)}
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            width: 20,
            height: 20,
            opacity: 0,
            transition: "opacity 0.3s ease",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          }}
        >
          <CloseIcon sx={{ fontSize: 14 }} />
        </IconButton>
      </Box>
    );
  };

  // Function to remove image
  const removeImage = (index) => {
    setUploadedImages((prevImages) =>
      prevImages.filter((image, i) => i !== index)
    );
  };

  const removeVideo = () => {
    setUploadedVideos(false);
  };

  // Function to display image previews
  const renderImagePreviews = () => {
    return uploadedImages.map((image, index) => (
      <Box
        key={index}
        sx={{
          position: "relative",
          display: "inline-block",
          width: 100,
          height: 100,
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          marginRight: 1,
          marginBottom: 1,
          "&:hover .delete-image": { opacity: 1 },
        }}
      >
        <img
          src={URL.createObjectURL(image)}
          alt="Preview"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <IconButton
          className="delete-image"
          onClick={() => removeImage(index)}
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            width: 20,
            height: 20,
            opacity: 0,
            transition: "opacity 0.3s ease",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          }}
        >
          <CloseIcon sx={{ fontSize: 14 }} />
        </IconButton>
      </Box>
    ));
  };

  // Function for display video previews
  const renderVideoPreview = () => {
    if (!uploadedVideos) return null; // Prevent errors if there's no video

    let videoSrc = null;
    if (uploadedVideos instanceof File) {
      videoSrc = URL.createObjectURL(uploadedVideos);
    } else if (typeof uploadedVideos === "string") {
      videoSrc = uploadedVideos; // Directly use URL if it's already uploaded
    }

    if (!videoSrc) return null; // If still invalid, return nothing

    return (
      <Box
        sx={{
          position: "relative",
          display: "inline-block",
          width: "250px",
          height: "140px",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          marginTop: 2,
          "&:hover .delete-video": { opacity: 1 },
        }}
      >
        <video
          src={videoSrc}
          controls
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        >
          Your browser does not support the video tag.
        </video>

        <IconButton
          className="delete-video"
          onClick={removeVideo}
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            width: 24,
            height: 24,
            opacity: 0,
            transition: "opacity 0.3s ease",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    );
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonLoading(true);

    const formDataToSend = new FormData();

    // Append form fields to FormData
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // Append uploaded images
    uploadedImages.forEach((image) => {
      formDataToSend.append("images", image);
    });

    // Append uploaded video
    if (uploadedVideos) {
      formDataToSend.append("video", uploadedVideos);
    }

    formDataToSend.append("image", uploadedDpImage);

    try {
      const response = await axios.patch(
        `${process.env.BASE_URL}/api/v1/commercial/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Property updated successfully!");
        refetch(); // Refetch the property data
      }
      setButtonLoading(false);
      setUploadedVideos(null);
    } catch (error) {
      setButtonLoading(false);
      console.error("Error updating property:", error);
      toast.error("Failed to update property.");
    }
  };

  const inWords = (num) => {
    const price = Number(num);

    const ones = [
      "Zero",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const suffixes = ["", "Hundred", "Thousand", "Lakhs", "Crore"];

    const toWords = (num) => {
      if (num === 0) return "";
      if (num < 10) return ones[num];
      if (num < 20) return teens[num - 10];
      if (num < 100)
        return tens[Math.floor(num / 10) - 2] + " " + toWords(num % 10);
      if (num < 1000)
        return (
          ones[Math.floor(num / 100)] +
          " " +
          suffixes[1] +
          " " +
          toWords(num % 100)
        );
      if (num < 100000)
        return (
          toWords(Math.floor(num / 1000)) +
          " " +
          suffixes[2] +
          " " +
          toWords(num % 1000)
        );
      if (num < 10000000)
        return (
          toWords(Math.floor(num / 100000)) +
          " " +
          suffixes[3] +
          " " +
          toWords(num % 100000)
        );
      return (
        toWords(Math.floor(num / 10000000)) +
        " " +
        suffixes[4] +
        " " +
        toWords(num % 10000000)
      );
    };

    return toWords(price);
  };

  return (
    <>
      <ToastContainer />
      <AdminLayout />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-20">
          <h2 className="text-xl font-bold p-2 text-center sm:text-left">
            Update Commercial Property
          </h2>
          <div className="container mx-auto">
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  mt: 3,
                  p: 3,
                  border: "1px solid #E0E0E0",
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
                  maxWidth: "600px",
                  margin: "auto",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", fontWeight: "600", color: "#333" }}
                >
                  Property Details
                </Typography>

                {/* Property Type */}
                <TextField
                  label="Property Type (e.g., RERA)"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  fullWidth
                />

                {/* Property Name */}
                <TextField
                  label="Property Name*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  fullWidth
                />

                {/* Builder Name */}
                <TextField
                  label="Builder Name*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="builder"
                  value={formData.builder}
                  onChange={handleChange}
                  fullWidth
                />

                {/* Location */}
                <TextField
                  label="Property Location*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  fullWidth
                />

                {/* Address */}
                <TextField
                  label="Property Address*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                />

                {/* Description */}
                <TextField
                  label="Property Description*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  minRows={4}
                  fullWidth
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  mt: 3,
                  p: 3,
                  border: "1px solid #E0E0E0",
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
                  maxWidth: "600px",
                  margin: "auto",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", fontWeight: "600", color: "#333" }}
                >
                  Size & Price
                </Typography>
                {/* Unit Input */}
                <TextField
                  label="Unit (e.g., 2 bhk/BHK)*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  fullWidth
                />

                {/* Property Size Input */}
                <TextField
                  type="number"
                  label="Size of Property (in digits)*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  fullWidth
                />

                {/* Size Unit Selection */}
                <FormControl variant="outlined" size="small" fullWidth>
                  <InputLabel>Unit Type</InputLabel>
                  <Select
                    name="sizeUnit"
                    value={formData.sizeUnit}
                    onChange={handleChange}
                    label="Size Unit"
                  >
                    <MenuItem value="sqFt">Sqft</MenuItem>
                    <MenuItem value="yard">Yard</MenuItem>
                  </Select>
                </FormControl>

                {/* Price Input */}
                <TextField
                  type="number"
                  label="Enter Price (in digits)*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  fullWidth
                />

                {/* Price in Words Display */}
                <Typography
                  variant="body2"
                  sx={{ color: "#333", fontWeight: "500", mt: -1 }}
                >
                  Price in words:{" "}
                  {formData.price ? inWords(Number(formData.price)) : "N/A"}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  mt: 3,
                  p: 3,
                  border: "1px solid #E0E0E0",
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
                  maxWidth: "600px",
                  margin: "auto",
                }}
              >
                {/* Title */}
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", fontWeight: "600", color: "#333" }}
                >
                  Project Details
                </Typography>

                {/* Project Size Input */}
                <TextField
                  label="Project Size (e.g. 50 acres)*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="projectSize"
                  value={formData.projectSize}
                  onChange={handleChange}
                  fullWidth
                />

                {/* Project Status Input */}
                <TextField
                  label="Project Status (e.g. Under Construction, Completed)*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="projectStatus"
                  value={formData.projectStatus}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              >
                {/* Select All Checkbox */}
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      checked={selectAll}
                      name="selectAll"
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Select All"
                />

                {/* Prevent error by ensuring `allAmenities` exists */}
                {amenities.length > 0 &&
                  amenities.map((amenity) => (
                    <FormControlLabel
                      key={amenity._id}
                      control={
                        <Checkbox
                          color="secondary"
                          name={amenity._id}
                          checked={formData.amenities?.includes(amenity._id)}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label={amenity.name}
                      sx={{
                        backgroundColor: "#f5f5f5",
                        padding: "8px 12px",
                        borderRadius: "6px",
                      }}
                    />
                  ))}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  mt: 3,
                  p: 3,
                  border: "1px solid #E0E0E0",
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
                  maxWidth: "600px",
                  margin: "auto",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", fontWeight: "600", color: "#333" }}
                >
                  Upload
                </Typography>
                {/* Image Upload */}
                <FormControl
                  sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                >
                  <FormLabel>
                    Upload Property Images (JPEG, JPG, PNG - Max 2MB)
                  </FormLabel>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="image-upload-input"
                    type="file"
                    ref={imageInputRef}
                    multiple
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="image-upload-input">
                    <Button
                      variant="outlined"
                      component="span"
                      size="small"
                      sx={{
                        textTransform: "none",
                        borderRadius: "8px",
                        ":hover": { backgroundColor: "#f5f5f5" },
                      }}
                    >
                      Choose Images
                    </Button>
                  </label>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", mt: 2, gap: 1 }}
                  >
                    {renderImagePreviews()}
                  </Box>
                  <Typography variant="body2">
                    {uploadedImages.length} images selected
                  </Typography>
                </FormControl>

                {/* Video Upload */}
                <FormControl
                  sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                >
                  <FormLabel>Upload Property Video (MP4, WEBM, OGG)</FormLabel>
                  <input
                    accept="video/*"
                    style={{ display: "none" }}
                    id="video-upload-input"
                    type="file"
                    ref={videoInputRef}
                    onChange={handleVideoUpload}
                  />
                  <label htmlFor="video-upload-input">
                    <Button
                      variant="outlined"
                      component="span"
                      size="small"
                      sx={{
                        textTransform: "none",
                        borderRadius: "8px",
                        ":hover": { backgroundColor: "#f5f5f5" },
                      }}
                    >
                      Choose Video
                    </Button>
                  </label>
                  <Box sx={{ mt: 2 }}>{renderVideoPreview()}</Box>
                  <Typography variant="body2">
                    {uploadedVideos ? "1 video selected" : "No video selected"}
                  </Typography>
                </FormControl>

                {/* Description Upload */}
                <FormControl
                  sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                >
                  <FormLabel>Upload Dealer Logo's</FormLabel>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="description-upload-input"
                    type="file"
                    ref={dpInputRef}
                    onChange={handleDescriptionUpload}
                  />
                  <label htmlFor="description-upload-input">
                    <Button
                      variant="outlined"
                      component="span"
                      size="small"
                      sx={{
                        textTransform: "none",
                        borderRadius: "8px",
                        ":hover": { backgroundColor: "#f5f5f5" },
                      }}
                    >
                      Enter Property DP
                    </Button>
                  </label>
                  <Box sx={{ mt: 2 }}>{renderDescriptionPreview()}</Box>
                </FormControl>

                {/* Submit Button */}
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={!loading && <AddCircleIcon />}
                  type="submit"
                  size="small"
                  onClick={handleSubmit}
                  sx={{
                    width: "150px",
                    alignSelf: "center",
                    textTransform: "none",
                    borderRadius: "8px",
                    fontWeight: "500",
                    ":hover": { backgroundColor: "#d32f2f" },
                  }}
                >
                  {buttonLoading ? (
                    <CircularProgress size="25px" sx={{ color: "white" }} />
                  ) : (
                    "Update Property"
                  )}
                </Button>
              </Box>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
