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
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-20">
          <div className="container mx-auto">
            <h2 className="text-xl font-bold p-2 text-center sm:text-left">
              Add News
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap my-5">
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
                      Max size: 1 mb)
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
                        style={{ textTransform: "none" }}
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
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <img
                            src={imagePreview}
                            alt="Preview"
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              borderRadius: "8px",
                            }}
                          />
                          <button
                            onClick={() => setImagePreview(null)} // Remove preview
                            style={{
                              position: "absolute",
                              top: "5px",
                              right: "5px",
                              background: "red",
                              color: "white",
                              border: "none",
                              borderRadius: "50%",
                              width: "20px",
                              height: "20px",
                              cursor: "pointer",
                              fontSize: "12px",
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      </Box>
                    )}
                  </Box>
                </div>
              </div>
              <div className="p-2">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={!loading && <AddCircleIcon />}
                  type="submit"
                  size="small"
                  style={{ textTransform: "none", width: "130px" }}
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
