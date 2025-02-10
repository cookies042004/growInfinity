import React, { useState } from "react";
import { Button, Typography, Modal, Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export const EnquiryForm = ({ handleClose, open }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    otp: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 600,
    bgcolor: "#f3f3fe",
    borderRadius: "40px",
    boxShadow: 24,
    py: 2,
    px: 1,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const requestOtp = async () => {
    if (!formData.email) {
      toast.error("Please enter an email.");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.BASE_URL}/api/v1/email/send-otp`,
        {
          email: formData.email,
        }
      );
      if (response.data.success) {
        setOtpSent(true);
        toast.success("OTP sent to your email.");
      } else {
        toast.error("Failed to send OTP.");
      }
    } catch (error) {
      toast.error("Error sending OTP. Try again.");
    }
  };

  const verifyOtp = async () => {
    if (!formData.otp) {
      toast.error("Please enter the OTP.");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.BASE_URL}/api/v1/email/verify-otp`,
        {
          email: formData.email,
          otp: formData.otp,
        }
      );
      if (response.data.success) {
        setVerified(true);
        toast.success("OTP verified!");
      } else {
        toast.error("Invalid OTP.");
      }
    } catch (error) {
      toast.error("OTP verification failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.message ||
      !formData.otp
    ) {
      setError("All fields are required.");
      return;
    }
    if (!verified) {
      setError("Please verify OTP before submitting.");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.BASE_URL}/api/v1/contact`,
        {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }
      );
      if (response.data.success) {
        toast.success("Enquiry submitted successfully.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          otp: "",
          message: "",
        });
        setOtpSent(false);
        setVerified(false);
        handleClose();
      } else {
        setError("There was an issue. Please try again.");
      }
    } catch (error) {
      setError("Network error. Try again.");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h1 className="text-center text-2xl lg:text-4xl py-2">Contact Us</h1>
          <p className="text-center text-sm lg:text-lg">
            We will get back to you asap!
          </p>
          {error && <Typography color="error">{error}</Typography>}

          <form className="mx-3 lg:mx-8 mt-6" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-12 gap-3">
              <div className="col-span-6">
                <div className="flex border rounded-lg items-center bg-white">
                  <PersonIcon sx={{ color: "gray", margin: 1 }} />
                  <input
                    type="text"
                    name="firstName"
                    className="outline-none p-3 rounded-lg w-full"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-span-6">
                <input
                  type="text"
                  name="lastName"
                  className="outline-none p-3 rounded-lg w-full border bg-white"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-span-12">
                <input
                  type="text"
                  name="phone"
                  className="outline-none p-3 rounded-lg w-full border bg-white"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-span-12">
                <div className="flex border rounded-lg items-center bg-white">
                  <MarkunreadIcon sx={{ color: "gray", margin: 1 }} />
                  <input
                    type="email"
                    name="email"
                    className="outline-none p-3 rounded-lg w-full"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={requestOtp}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {otpSent ? "Resend OTP" : "Send OTP"}
                  </button>
                </div>
              </div>
              {otpSent && (
                <div className="col-span-12">
                  <input
                    type="number"
                    name="otp"
                    className="outline-none p-3 rounded-lg w-full border bg-white"
                    placeholder="Enter OTP"
                    value={formData.otp}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={verifyOtp}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    Verify OTP
                  </button>
                </div>
              )}
              <div className="col-span-12">
                <textarea
                  name="message"
                  className="outline-none p-3 rounded-lg w-full border bg-white"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-span-12">
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#03002E" }}
                  size="large"
                  fullWidth
                  type="submit"
                >
                  Send
                </Button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};
