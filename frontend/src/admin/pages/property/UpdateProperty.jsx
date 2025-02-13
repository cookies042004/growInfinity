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
} from "@mui/material";
import { useFetchData } from "../../../hooks/useFetchData";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./UpdateProperty.css";

export const UpdateProperty = () => {
  document.title = "Update Property";
  const { id } = useParams();
  const [buttonLoading, setButtonLoading] = useState(false);
  // Fetching the property data by ID
  const { data, loading, error, refetch } = useFetchData(
    `${process.env.BASE_URL}/api/v1/property/${id}`
  );
  console.log("DATA IS", data?.property);

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
  console.log("amenities is", amenities);

  // State to manage form data
  const [formData, setFormData] = useState({
    category: "",
    propertyType: "", //PROPERTY TYPE ADDED HERE
    name: "",
    builder: "",
    unit: "",
    size: "",
    sizeUnit: "", //SIZEUNIT ADDED HERE
    price: "",
    location: "",
    address: "",
    description: "",
    furnishType: "",
    societyAmenities: [],
    flatAmenities: [],
    locationAdvantages: [],
  });

  // State to track uploaded images and brochure
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState(null);
  // State to manage select all
  const [selectAllSociety, setSelectAllSociety] = useState([]);
  const [selectAllFlat, setSelectAllFlat] = useState([]);
  const [selectAllLocation, setSelectAllLocation] = useState([]);
  const [sizeUnit, setSizeUnit] = useState("");

  // Ref to the file input element
  const imageInputRef = useRef();
  const videoInputRef = useRef();

  // Load property data into formData when property is fetched
  useEffect(() => {
    if (data?.property) {
      const property = data.property;
      setFormData({
        category: property.category._id || "",
        propertyType: property.propertyType || "", //PROPERTY TYPE ADDED HERE
        name: property.name || "",
        builder: property.builder || "",
        unit: property.unit || "",
        size: property.size || "",
        price: property.price || "",
        location: property.location || "",
        address: property.address || "",
        description: property.description || "",
        furnishType: property.furnishType || "",
        societyAmenities: property.amenities
          ?.filter((amenity) => amenity.type === "society_amenity")
          ?.map((amenity) => amenity._id),
        flatAmenities: property.amenities
          .filter((amenity) => amenity.type === "flat_amenity")
          ?.map((amenity) => amenity._id),
        locationAdvantages: property.amenities
          ?.filter((amenity) => amenity.type === "location_advantages")
          ?.map((amenity) => amenity._id),
      });
      setUploadedImages(property.images || []);
      // setUploadedVideos(property.video || null  );
      setSizeUnit(property.sizeUnit);
      setSelectAllSociety(
        property.amenities.filter((a) => a.type === "society_amenity")
          .length ===
          amenities.filter((a) => a.type === "society_amenity").length
      );
      setSelectAllFlat(
        property.amenities.filter((a) => a.type === "flat_amenity").length ===
          amenities.filter((a) => a.type === "flat_amenity").length
      );
      setSelectAllLocation(
        property.amenities.filter((a) => a.type === "location_advantages")
          .length ===
          amenities.filter((a) => a.type === "location_advantages").length
      );
    }
  }, [data]);
  // console.log("Uploaded videos", uploadedVideos);

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
    const { name, checked } = event.target; // Use name instead of

    if (name === "selectAll") {
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
    // Ensure uploadedVideos is valid before using it
    if (!uploadedVideos) return null; // Prevents errors if it's null/undefined

    let videoSrc = null;
    if (uploadedVideos instanceof File) {
      videoSrc = URL.createObjectURL(uploadedVideos);
    } else if (typeof uploadedVideos === "string") {
      videoSrc = uploadedVideos; // Use directly if it's a URL
    }

    if (!videoSrc) return null; // If still invalid, return nothing

    return (
      <div className="preview">
        <video controls>
          <source src={videoSrc} type="video/mp4" />
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
    );
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonLoading(true);
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

    // Append uploaded images
    uploadedImages.forEach((image) => {
      formDataToSend.append("images", image);
    });

    // Append uploaded video
    if (uploadedVideos) {
      formDataToSend.append("video", uploadedVideos);
    }

    formDataToSend.append("sizeUnit", sizeUnit); //SIZEUNIT ADDED HERE

    try {
      const response = await axios.patch(
        `${process.env.BASE_URL}/api/v1/property/${id}`,
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
      setSelectAllSociety([]);
      setSelectAllFlat([]);
      setSelectAllLocation([]);
      setSizeUnit();
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
      if (num < 100) return tens[Math.floor(num / 10) - 2] + " " + toWords(num % 10);
      if (num < 1000) return ones[Math.floor(num / 100)] + " " + suffixes[1] + " " + toWords(num % 100);
      if (num < 100000) return toWords(Math.floor(num / 1000)) + " " + suffixes[2] + " " + toWords(num % 1000);
      if (num < 10000000) return toWords(Math.floor(num / 100000)) + " " + suffixes[3] + " " + toWords(num % 100000);
      return toWords(Math.floor(num / 10000000)) + " " + suffixes[4] + " " + toWords(num % 10000000);
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
            Update Property
          </h2>
          <div className="container mx-auto">
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: "column",
                  padding: "12px",
                  border: "2px solid #ccc",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <FormControl color="secondary" size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Property Category*
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
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

                <TextField
                  label="Enter Type of Property"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="propertyType"
                  className="w-48"
                  value={formData.propertyType}
                  onChange={handleChange}
                  fullWidth
                />

                <TextField
                  label="Enter Property Name*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                />

                <TextField
                  label="Enter Builder Name*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="builder"
                  value={formData.builder}
                  onChange={handleChange}
                  fullWidth
                />

                <TextField
                  label="Enter Property Location*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  fullWidth
                />

                <TextField
                  label="Enter Property Address*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                />

                <TextField
                  label="Enter Property Description*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  fullWidth
                  minRows={4}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 2,
                  mt: 2,
                  padding: "12px",
                  border: "2px solid #ccc",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <TextField
                  label="Enter Unit (in BHK)*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  style={{ width: "50%" }}
                />

                <TextField
                  label="Enter Size*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  style={{ width: "50%" }}
                />

                <FormControl variant="outlined" size="small" 
                    style={{ width: "10%" }}>
                  <InputLabel id="size-input-label">Unit Type</InputLabel>
                  <Select
                    labelId="size-input-label"
                    id="size-input"
                    name="sizeUnit"
                    value={sizeUnit}
                    onChange={handleChange}
                    label="Size Unit"
                  >
                    <MenuItem value="sqFt">Sqft</MenuItem>
                    <MenuItem value="yard">yard</MenuItem>
                  </Select>
                </FormControl>

                  <TextField
                    label="Enter Price (in digits)*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    style={{ width: "50%" }}
                  />
                  <Typography variant="body2">
                    Price in words: {formData.price ? inWords(Number(formData.price)) : "N/A"}
                  </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  mt: 2,
                  padding: "12px",
                  border: "2px solid #ccc",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                {/* Furnish Type */}
                <FormControl
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "10px ",
                  }}
                >
                  {/* Title */}
                  <FormLabel
                    color="secondary"
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                      color: "#333",
                    }}
                  >
                    Furnish Type
                  </FormLabel>

                  {/* Radio Buttons */}
                  <RadioGroup
                    name="furnishType"
                    value={formData.furnishType}
                    onChange={handleChange}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <FormControlLabel
                      value="Fully Furnished"
                      control={<Radio color="secondary" />}
                      label="Fully Furnished"
                      style={{
                        backgroundColor: "#ffffff",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                      }}
                    />
                    <FormControlLabel
                      value="Semi Furnished"
                      control={<Radio color="secondary" />}
                      label="Semi Furnished"
                      style={{
                        backgroundColor: "#ffffff",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                      }}
                    />
                    <FormControlLabel
                      value="Unfurnished"
                      control={<Radio color="secondary" />}
                      label="Unfurnished"
                      style={{
                        backgroundColor: "#ffffff",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                      }}
                    />
                  </RadioGroup>
                </FormControl>

                {/* Society Amenitie */}
                <FormControl component="fieldset">
                  <FormLabel color="secondary">Society Amenities</FormLabel>
                  <RadioGroup
                    value={selectAllSociety ? "selectAll" : "individual"}
                    onChange={(e) => handleRadioChange(e, "societyAmenities")}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      backgroundColor: "#ffffff",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                    }}
                  >
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}
                    >
                      <FormControlLabel
                        control={
                          <Radio
                            color="secondary"
                            value="selectAll"
                            onChange={(e) =>
                              handleRadioChange(e, "societyAmenities")
                            }
                          />
                        }
                        label="Select All"
                        style={{ marginBottom: "8px" }} // Inline style
                      />

                      {amenities
                        .filter((amenity) => amenity.type === "society_amenity")
                        .map((amenity) => (
                          <FormControlLabel
                            key={amenity._id}
                            control={
                              <Checkbox
                                color="secondary"
                                name={amenity._id}
                                checked={formData.societyAmenities?.includes(
                                  amenity._id
                                )}
                                onChange={(e) =>
                                  handleCheckboxChange(e, "societyAmenities")
                                }
                              />
                            }
                            label={amenity.name}
                            style={{
                              backgroundColor: "#f5f5f5",
                              padding: "6px 12px",
                              borderRadius: "5px",
                            }}
                          />
                        ))}
                    </div>
                  </RadioGroup>
                </FormControl>

                {/* Flat Amenities */}
                <FormControl component="fieldset">
                  <FormLabel color="secondary">Flat Amenities</FormLabel>
                  <RadioGroup
                    value={selectAllFlat ? "selectAll" : "individual"}
                    onChange={(e) => handleRadioChange(e, "flatAmenities")}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      backgroundColor: "#ffffff",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                    }}
                  >
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}
                    >
                      <FormControlLabel
                        control={
                          <Radio
                            color="secondary"
                            value="selectAll"
                            onChange={(e) =>
                              handleRadioChange(e, "flatAmenities")
                            }
                          />
                        }
                        label="Select All"
                      />

                      {amenities
                        .filter((amenity) => amenity.type === "flat_amenity")
                        .map((amenity) => (
                          <FormControlLabel
                            key={amenity._id}
                            control={
                              <Checkbox
                                color="secondary"
                                name={amenity._id}
                                checked={formData.flatAmenities?.includes(
                                  amenity._id
                                )}
                                onChange={(e) =>
                                  handleCheckboxChange(e, "flatAmenities")
                                }
                              />
                            }
                            label={amenity.name}
                            style={{
                              backgroundColor: "#f5f5f5",
                              padding: "6px 12px",
                              borderRadius: "5px",
                            }}
                          />
                        ))}
                    </div>
                  </RadioGroup>
                </FormControl>

                {/* Location Advantages */}
                <FormControl component="fieldset">
                  <FormLabel color="secondary">Location Advantages</FormLabel>
                  <RadioGroup
                    value={selectAllLocation ? "selectAll" : "individual"}
                    onChange={(e) => handleRadioChange(e, "locationAdvantages")}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      backgroundColor: "#ffffff",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                    }}
                  >
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}
                    >
                      <FormControlLabel
                        control={
                          <Radio
                            color="secondary"
                            value="selectAll"
                            onChange={(e) =>
                              handleRadioChange(e, "locationAdvantages")
                            }
                          />
                        }
                        label="Select All"
                      />

                      {amenities
                        .filter(
                          (amenity) => amenity.type === "location_advantages"
                        )
                        .map((amenity) => (
                          <FormControlLabel
                            key={amenity._id}
                            control={
                              <Checkbox
                                color="secondary"
                                name={amenity._id}
                                checked={formData.locationAdvantages?.includes(
                                  amenity._id
                                )}
                                onChange={(e) =>
                                  handleCheckboxChange(e, "locationAdvantages")
                                }
                              />
                            }
                            label={amenity.name}
                            style={{
                              backgroundColor: "#f5f5f5",
                              padding: "6px 12px",
                              borderRadius: "5px",
                            }}
                          />
                        ))}
                    </div>
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <FormControl component="fieldset">
                  <FormLabel id="image-upload">
                    Upload Property Images - (Only jpeg, jpg, png files are
                    allowed Max size: 2 mb)
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
                      style={{ textTransform: "none" }}
                    >
                      Choose Images
                    </Button>
                  </label>

                  <div className="flex flex-wrap mt-2">
                    {renderImagePreviews()}
                  </div>

                  <Typography variant="body2">
                    {uploadedImages.length} images selected
                  </Typography>
                </FormControl>

                <FormControl component="fieldset">
                  <FormLabel id="video-upload">
                    Upload Property Videos - (Only mp4, webm, ogg files are
                    required)
                  </FormLabel>
                  <input
                    accept="video/*"
                    style={{ display: "none" }}
                    id="video-input-upload"
                    type="file"
                    ref={videoInputRef}
                    onChange={handleVideoUpload}
                  />
                  <label htmlFor="video-input-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      size="small"
                      style={{ textTransform: "none" }}
                    >
                      Choose Video
                    </Button>
                  </label>
                  <div className="flex flex-wrap mt-2">
                    {renderVideoPreview()}
                  </div>
                  <Typography variant="body2">
                    {uploadedVideos ? "1 video selected" : "No video selected"}
                  </Typography>
                </FormControl>

                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={!buttonLoading && <AddCircleIcon />} // Conditional rendering for the icon
                  type="submit"
                  size="small"
                  style={{ textTransform: "none", width: "150px" }}
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
