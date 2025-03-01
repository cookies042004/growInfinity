import React, { useState, useRef } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AdminLayout } from "../../components/AdminLayout";

export const AddNews = () => {
  document.title = "Add News";
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    url: "",
    title: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null); // New state for image preview

  const apiUrl = `${process.env.BASE_URL}/api/v1/news`;
  console.log("apiUrl", apiUrl);
  const imageInputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Ensure the file is properly set
    setFormData({
      ...formData,
      image: file, // Ensure the file is properly set
    });

    // Set image preview URL
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl); // Set the preview URL for image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("url", formData.url);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("image", formData.image);

    try {
      const response = await axios.post(apiUrl, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Failed to add news");
      }

      setFormData({
        url: "",
        title: "",
        image: null,
      });
      setImagePreview(null); // Reset image preview after successful submission
      imageInputRef.current.value = null; // Reset the file input
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error); // Log the error
      toast.error("An error occurred while adding the news");
    }
  };

  return (
    <>
      <ToastContainer />
      <AdminLayout />

      <div className="p-4 sm:ml-64">
        <div className="p-6 border-2 border-gray-300 border-dashed rounded-lg shadow-md hover:shadow-lg transition-all dark:border-gray-700 mt-20 max-w-lg mx-auto bg-white">
          <div className="container mx-auto">
            <h2 className="text-xl font-bold p-2 text-center sm:text-left mb-4">
              Add News
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap my-5">
                {/* News Title */}
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <TextField
                    id="outlined-basic"
                    label="Enter News Title*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="title"
                    value={formData.title}
                    fullWidth
                    onChange={handleChange}
                  />
                </div>
                {/* News URL */}
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <TextField
                    id="outlined-basic"
                    label="Enter News URL*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="url"
                    value={formData.url}
                    fullWidth
                    onChange={handleChange}
                  />
                </div>

                {/* File input for image upload */}
                <div className="w-full p-2">
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body1" gutterBottom>
                      Upload News Image - (Only jpeg, jpg, png files are allowed
                      Max size: 1 MB)
                    </Typography>
                    <input
                      accept="image/*"
                      ref={imageInputRef}
                      style={{ display: "none" }}
                      id="upload-button-file"
                      type="file"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="upload-button-file">
                      <Button
                        variant="outlined"
                        color="primary"
                        component="span"
                        size="small"
                        className="mt-2 border-gray-400 text-gray-700 hover:border-gray-600 hover:text-gray-900 transition-all"
                      >
                        Choose File
                      </Button>
                    </label>

                    {/* Image Preview */}
                    {imagePreview && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" gutterBottom>
                          Image Preview:
                        </Typography>
                        <div className="relative inline-block">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-w-full h-auto rounded-lg border border-gray-300"
                          />
                          <button
                            onClick={() => setImagePreview(null)} // Remove preview
                            className="absolute top-1 right-1 bg-red-600 text-white border-none rounded-full w-6 h-6 flex items-center justify-center text-xs cursor-pointer hover:bg-red-800 transition-all"
                          >
                            ✕
                          </button>
                        </div>
                      </Box>
                    )}
                  </Box>
                </div>
              </div>

              {/* Submit Button */}
              <div className="p-2 flex justify-center">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={!loading && <AddCircleIcon />}
                  type="submit"
                  size="small"
                  className="text-white text-sm font-medium rounded-lg transition-transform transform hover:scale-105 hover:bg-red-700"
                  style={{ textTransform: "none", width: "150px" }}
                >
                  {loading ? (
                    <CircularProgress size="25px" sx={{ color: "white" }} />
                  ) : (
                    "Add News"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
