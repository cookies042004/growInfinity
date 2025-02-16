import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { AdminLayout } from "../../components/AdminLayout";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const AddTestimonial = () => {
  document.title = "Add Testimonial";

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    review: "",
    selectedFile: null,
    imagePreview: null, // ✅ Added state for preview
  });
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef();

  const apiUrl = `${process.env.BASE_URL}/api/v1/testimonials`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        selectedFile: file,
        imagePreview: previewUrl, // ✅ Store preview URL
      }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      selectedFile: null,
      imagePreview: null, // ✅ Reset preview
    }));
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("review", formData.review);
    formDataToSend.append("image", formData.selectedFile);

    try {
      const response = await axios.post(apiUrl, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          name: "",
          role: "",
          review: "",
          selectedFile: null,
          imagePreview: null, // ✅ Reset preview
        });
        if (imageInputRef.current) {
          imageInputRef.current.value = "";
        }
      } else {
        toast.error("Failed to add testimonial");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the testimonial");
    } finally {
      setLoading(false);
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
              Add Testimonial
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap my-5">
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <TextField
                    label="Enter Reviewer Name*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="name"
                    value={formData.name}
                    fullWidth
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <TextField
                    label="Enter Reviewer Role*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="role"
                    value={formData.role}
                    fullWidth
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full mb-4 p-2">
                  <TextField
                    label="Enter Review*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="review"
                    value={formData.review}
                    fullWidth
                    multiline
                    onChange={handleChange}
                  />
                </div>

                {/* ✅ File Input Section */}
                <div className="w-full p-2">
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body1" gutterBottom>
                      Upload Reviewer Image - (jpeg, jpg, png | Max size: 1MB)
                    </Typography>
                    <input
                      ref={imageInputRef}
                      accept="image/*"
                      style={{ display: "none" }}
                      id="upload-button-file"
                      type="file"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="upload-button-file">
                      <Button variant="outlined" color="primary" component="span" size="small">
                        Choose File
                      </Button>
                    </label>
                    
                    {/* ✅ Image Preview */}
                    {formData.imagePreview && (
                      <Box sx={{ mt: 2, textAlign: "center" }}>
                        <Typography variant="body2" gutterBottom>
                          Image Preview:
                        </Typography>
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                            border: "2px solid #ddd",
                            padding: "5px",
                            borderRadius: "8px",
                            background: "#f9f9f9",
                          }}
                        >
                          <img
                            src={formData.imagePreview}
                            alt="Preview"
                            style={{
                              maxWidth: "250px",
                              height: "auto",
                              borderRadius: "8px",
                            }}
                          />
                          <button
                            onClick={handleRemoveImage}
                            style={{
                              position: "absolute",
                              top: "-10px",
                              right: "-10px",
                              background: "red",
                              color: "white",
                              border: "none",
                              borderRadius: "50%",
                              width: "25px",
                              height: "25px",
                              cursor: "pointer",
                              fontSize: "16px",
                              fontWeight: "bold",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
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
                  style={{ textTransform: "none", width: "150px" }}
                >
                  {loading ? <CircularProgress size="25px" sx={{ color: "white" }} /> : "Add Testimonial"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
