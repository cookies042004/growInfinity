import React, { useState, useRef } from "react";
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
} from "@mui/material";
import { useFetchData } from "../../../hooks/useFetchData";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./AddProperty.css";
import { toWords } from "number-to-words";

export const AddProperty = () => {
  document.title = "Add Property";

  const [loading, setLoading] = useState(false);
  const [sizeUnit, setSizeUnit] = useState("sqFt");

  // Fetch categories and amenities data
  const {
    data: categoriesData,
    error: categoryError,
    loading: categoryLoading,
    refetch: refetchCategories,
  } = useFetchData(`${process.env.BASE_URL}/api/v1/category`);

  const categories = categoriesData?.category || [];

  const {
    data: amenitiesData,
    error: amenitiesError,
    loading: amenitiesLoading,
    refetch: refetchAmenities,
  } = useFetchData(`${process.env.BASE_URL}/api/v1/amenities`);

  const amenities = amenitiesData?.amenity || [];

  // State to manage form data
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    builder: "",
    unit: "",
    size: "",
    price: "",
    location: "",
    address: "",
    description: "",
    furnishType: "",
    societyAmenities: [],
    flatAmenities: [],
    locationAdvantages: [],
    propertyType: "",
    projectStatus: "",
    projectSize: "",
    totalUnits: "",
  });

  // State to manage select all
  const [selectAllSociety, setSelectAllSociety] = useState(false);
  const [selectAllFlat, setSelectAllFlat] = useState(false);
  const [selectAllLocation, setSelectAllLocation] = useState(false);

  // State to track uploaded images and brochure
  const [uploadedImages, setUploadedImages] = useState([]);
  // State to track uploaded video
  const [uploadedVideos, setUploadedVideos] = useState(null);
  // State to track uploaded dp image
  const [uploadedDpImage, setUploadedDpImage] = useState(null);

  // Ref to the file input element
  const imageInputRef = useRef();
  const videoInputRef = useRef();
  const dpInputRef = useRef();

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "sizeUnit") {
      setSizeUnit(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle select changes
  const handleSelectChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (event, type) => {
    const { name, checked } = event.target; // Use name instead of value

    if (name === "selectAll") {
      console.log("Select All");
      if (type === "societyAmenities") setSelectAllSociety(checked);
      if (type === "flatAmenities") setSelectAllFlat(checked);
      if (type === "locationAdvantages") setSelectAllLocation(checked);

      setFormData({
        ...formData,
        [type]: checked
          ? amenities
              .filter((amenity) => amenity.type === amenityTypeMap[type])
              .map((amenity) => amenity._id)
          : [],
      });
    } else {
      const updatedAmenities = checked
        ? [...formData[type], name] // Using `name` instead of `value`
        : formData[type].filter((amenity) => amenity !== name);

      setFormData({ ...formData, [type]: updatedAmenities });

      // Check if all checkboxes are selected, then auto-check "Select All"
      const allSelected =
        updatedAmenities.length ===
        amenities.filter((amenity) => amenity.type === getAmenityType(type))
          .length;

      if (type === "societyAmenities") setSelectAllSociety(allSelected);
      if (type === "flatAmenities") setSelectAllFlat(allSelected);
      if (type === "locationAdvantages") setSelectAllLocation(allSelected);
    }
  };

  // dynamic amenity type mapping
  const getAmenityType = (type) => {
    return type === "locationAdvantages"
      ? "location_advantages"
      : type.replace("Amenities", "_amenity");
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

  // Handler for image uploading
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

  // Function to remove image
  const removeImage = (index) => {
    setUploadedImages((prevImages) =>
      prevImages.filter((image, i) => i !== index)
    );
  };

  const removeDpImage = () => {
    setUploadedDpImage(null);
  };

  const removeVideo = () => {
    setUploadedVideos(false);
  };

  // Function to display image previews
  const renderImagePreviews = () => {
    return uploadedImages.map((image, index) => (
      <div
        key={index}
        style={{ position: "relative", display: "inline-block" }}
      >
        <img
          src={URL.createObjectURL(image)}
          alt="Preview"
          className="image-preview"
        />
        <button
          type="button"
          className="delete-image"
          onClick={() => removeImage(index)}
        >
          X
        </button>
      </div>
    ));
  };

  // Function for display video previews
  const renderVideoPreview = () => {
    return uploadedVideos ? (
      <div className="preview">
        <video controls>
          <source src={URL.createObjectURL(uploadedVideos)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button
          type="button"
          className="delete-video"
          onClick={() => removeVideo()}
        >
          X
        </button>
      </div>
    ) : null;
  };

  const renderDescriptionPreview = () => {
    return uploadedDpImage ? (
      <div className="preview">
        <img
          src={URL.createObjectURL(uploadedDpImage)}
          alt="Preview"
          className="image-preview"
        />
        <button
          type="button"
          className="delete-image"
          onClick={() => removeDpImage()}
        >
          X
        </button>
      </div>
    ) : null;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const allSelectedAmenities = [
      ...formData.societyAmenities,
      ...formData.flatAmenities,
      ...formData.locationAdvantages,
    ];

    const formDataToSend = new FormData();

    // Append form fields to FormData
    Object.keys(formData).forEach((key) => {
      if (
        Array.isArray(formData[key]) &&
        (key === "societyAmenities" ||
          key === "flatAmenities" ||
          key === "locationAdvantages")
      ) {
        formData[key].forEach((item) =>
          formDataToSend.append("amenities", item)
        );
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    formDataToSend.append("sizeUnit", sizeUnit);

    // Append uploaded images
    uploadedImages.forEach((image) => {
      formDataToSend.append("images", image);
    });

    formDataToSend.append("video", uploadedVideos);

    formDataToSend.append("image", uploadedDpImage);

    try {
      const response = await axios.post(
        `${process.env.BASE_URL}/api/v1/property`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Property added successfully!");
        setFormData({
          category: "",
          name: "",
          builder: "",
          unit: "",
          size: "",
          price: "",
          location: "",
          address: "",
          description: "",
          furnishType: "",
          societyAmenities: [],
          flatAmenities: [],
          locationAdvantages: [],
          propertyType: "",
          projectStatus: "",
          projectSize: "",
          totalUnits: "",
        });
        setSizeUnit("sqFt");
        setSelectAllFlat(false);
        setSelectAllLocation(false);
        setSelectAllSociety(false);
        setUploadedVideos(false);
        setUploadedImages([]);
        setUploadedDpImage("");

        // Reset the file input after submission
        if (imageInputRef.current) {
          imageInputRef.current.value = ""; // Reset the file input
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error adding property:", error);
      toast.error("Failed to add property.", error);
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
            Add Property
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

                {/* Property Category Dropdown */}
                <FormControl color="secondary" size="small" fullWidth>
                  <InputLabel>Property Category*</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleSelectChange}
                    label="Property Category*"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

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
                  name="name"
                  value={formData.name}
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
                  label="Unit (e.g., 2 BHK - bhk/BHK)*"
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

                {/* Total Units Input */}
                <TextField
                  label="Total Units (e.g. 200, only numeric values)*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="totalUnits"
                  value={formData.totalUnits}
                  onChange={handleChange}
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
                  Amenity Details
                </Typography>
                {/* Furnish Type */}
                <FormControl>
                  <FormLabel
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#333",
                      mb: 1,
                    }}
                  >
                    Furnish Type
                  </FormLabel>
                  <RadioGroup
                    name="furnishType"
                    value={formData.furnishType}
                    onChange={handleChange}
                    sx={{ gap: 1 }}
                  >
                    {["Fully Furnished", "Semi Furnished", "Unfurnished"].map(
                      (type) => (
                        <FormControlLabel
                          key={type}
                          value={type}
                          control={<Radio color="secondary" />}
                          label={type}
                          sx={{
                            backgroundColor: "#f9f9f9",
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #ddd",
                          }}
                        />
                      )
                    )}
                  </RadioGroup>
                </FormControl>

                {/* Render Amenity Sections */}
                {[
                  {
                    label: "Society Amenities",
                    type: "society_amenity",
                    stateKey: "societyAmenities",
                  },
                  {
                    label: "Flat Amenities",
                    type: "flat_amenity",
                    stateKey: "flatAmenities",
                  },
                  {
                    label: "Location Advantages",
                    type: "location_advantages",
                    stateKey: "locationAdvantages",
                  },
                ].map(({ label, type, stateKey }) => (
                  <FormControl key={type} component="fieldset">
                    <FormLabel
                      sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#333",
                        mb: 1,
                      }}
                    >
                      {label}
                    </FormLabel>
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
                      <FormControlLabel
                        control={<Checkbox color="secondary" />}
                        label="Select All"
                        onChange={(e) => handleRadioChange(e, stateKey)}
                      />
                      {amenities
                        .filter((amenity) => amenity.type === type)
                        .map((amenity) => (
                          <FormControlLabel
                            key={amenity._id}
                            control={
                              <Checkbox
                                color="secondary"
                                name={amenity._id}
                                checked={formData[stateKey]?.includes(
                                  amenity._id
                                )}
                                onChange={(e) =>
                                  handleCheckboxChange(e, stateKey)
                                }
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
                  </FormControl>
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
                  {loading ? (
                    <CircularProgress size="25px" sx={{ color: "white" }} />
                  ) : (
                    "Add Property"
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
