import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography, CircularProgress } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AdminLayout } from "../../components/AdminLayout";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";

export const UpdateNews = () => {
  document.title = "Update News";

  const { id } = useParams();

  const [formData, setFormData] = useState({
    url: "",
    title: "",
    selectedFile: null,
  });

  const apiUrl = `${process.env.BASE_URL}/api/v1/news/${id}`;

  const [buttonLoading, setButtonLoading] = useState(false);

  const { data, loading, error, refetch } = useFetchData(apiUrl);

  // Load data into formData when news is fetched
  useEffect(() => {
    if (data?.news) {
      setFormData({
        url: data.news.url || "",
        title: data.news.title || "",
        selectedFile: null,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      selectedFile: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("url", formData.url);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("image", formData.selectedFile);

    try {
      const response = await axios.patch(apiUrl, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setButtonLoading(false);
        refetch();
      } else {
        toast.error("Failed to update news");
        setButtonLoading(false);
      }
    } catch (error) {
      setButtonLoading(false);
      console.error(error);
      toast.error("An error occurred while updating the news");
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
              Update News
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap my-5">
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <TextField
                    id="news-title"
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
                    id="news-url"
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

                {/* Image Preview */}
                <div className="w-full p-2">
                  {data?.news?.image && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body1" gutterBottom>
                        Current News Image:
                      </Typography>
                      <img
                        src={data.news.image}
                        alt="Current News"
                        style={{
                          maxWidth: "10%",
                          height: "auto",
                          borderRadius: "8px",
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </Box>
                  )}
                </div>

                {/* File Upload */}
                <div className="w-full p-2">
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body1" gutterBottom>
                      Upload News Image*
                    </Typography>
                    <input
                      accept="image/*"
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

                    {formData.selectedFile && formData.selectedFile.name && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {formData.selectedFile.name}
                      </Typography>
                    )}
                  </Box>
                </div>
              </div>

              <div className="p-2">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<ArrowCircleUpIcon />}
                  type="submit"
                  size="small"
                  style={{ textTransform: "none" }}
                >
                  {buttonLoading ? (
                    <CircularProgress size="25px" sx={{ color: "white" }} />
                  ) : (
                    "Update News"
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
