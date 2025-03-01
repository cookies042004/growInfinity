import React, { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AdminLayout } from "../../components/AdminLayout";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Button,
  TextField,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";

export const AddEvents = () => {
  document.title = "Add Events";

  // Ref to the file input element
  const imageInputRef = useRef();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = Array.from(event.target.files);
    setFormData({ ...formData, images: file });

    const previews = file.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRemoveImage = (index) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (
      !formData.title ||
      !formData.description ||
      formData.images.length === 0
    ) {
      toast.error("Please fill all the fields and upload images!");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    formData.images.forEach((file) => data.append("images", file));

    try {
      const response = await axios.post(
        `${process.env.BASE_URL}/api/v1/events`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        setLoading(false);
        toast.success("Event added successfully!");
        setFormData({ title: "", description: "", images: [] });
        setImagePreviews([]);
        // Reset the file input after submission
        if (imageInputRef.current) {
          imageInputRef.current.value = ""; // Reset the file input
        }
      } else {
        setLoading(false);

        console.error(response.data);
        toast.error("Failed to add event. Please try again.");
      }
    } catch (error) {
      setLoading(false);

      toast.error("Failed to add event. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <AdminLayout />
      <div className="p-4 sm:ml-64">
      <div className="p-6 border-2 border-gray-300 border-dashed rounded-lg mt-20 bg-white shadow-md">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold p-2 text-center sm:text-left text-gray-800">
            Add Events
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col space-y-4">
              {/* Event Title */}
              <div className="w-full">
                <TextField
                  label="Enter Event Title"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="title"
                  value={formData.title}
                  fullWidth
                  required
                  onChange={handleChange}
                />
              </div>

              {/* Event Description */}
              <div className="w-full">
                <TextField
                  label="Enter Event Description"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="description"
                  value={formData.description}
                  fullWidth
                  required
                  multiline
                  onChange={handleChange}
                />
              </div>

              {/* File Upload */}
              <div className="w-full">
                <Typography variant="body1" className="text-gray-700 font-medium">
                  Upload Event Images (JPEG, JPG, PNG, Max size: 1MB)
                </Typography>
                <input
                  ref={imageInputRef}
                  accept="image/*"
                  className="hidden"
                  id="upload-button-file"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                />
                <label htmlFor="upload-button-file">
                  <Button
                    variant="outlined"
                    color="primary"
                    component="span"
                    size="small"
                    className="capitalize"
                  >
                    Choose Files
                  </Button>
                </label>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <Box className="mt-4 flex flex-wrap gap-3">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative w-24 h-24">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg shadow-md"
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700 transition"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </Box>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                variant="contained"
                color="secondary"
                startIcon={!loading && <AddCircleIcon />}
                type="submit"
                size="small"
                className="w-32 capitalize"
              >
                {loading ? (
                  <CircularProgress size="20px" className="text-white" />
                ) : (
                  "Add Event"
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
