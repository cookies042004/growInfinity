import React, { useState } from "react";
import { Cancel } from "@mui/icons-material";
import { Button, Typography, Modal, Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import MessageIcon from "@mui/icons-material/Message";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import axios from "axios";
import { toast } from "react-toastify";

export const EnquiryHome = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      setError("All fields are required.");
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
      {/* Floating Button to Open Modal */}
      <div
        className={`hidden lg:block absolute right-0 top-[24%] rounded-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-[0]" : "translate-x-[0]"
        }`}
      >
        <div className="flex justify-center items-center cursor-pointer">
          {/* Vertical Tab Button */}
          <div
            className="bg-white rounded-s-lg shadow-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            <p
              className="font-medium uppercase py-1"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {isOpen ? "Close" : "Enquiry Form"}
            </p>
            {isOpen ? (
              <Cancel color="error" sx={{ fontSize: "35px" }} />
            ) : (
              <span
                className=""
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(270deg)",
                }}
              >
                📧
              </span>
            )}
          </div>
        </div>

        {/* Sliding Enquiry Form */}
        {isOpen && (
          <div className="fixed right-0 top-0 bg-white shadow-lg w-[450px] p-4 z-50 rounded-3xl">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h2 className="text-xl px-32 font-bold">Enquiry Form</h2>
                <h2 className="px-20">We will get back to you asap!</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-red-600 hover:text-red-800"
              >
                <Cancel sx={{ fontSize: 35 }} />
              </button>
            </div>

            {/* Form Fields */}
            <div className="mt-4">
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
                    <div className="flex border rounded-lg items-center bg-white">
                      <PhoneIcon sx={{ color: "gray", margin: 1 }} />
                      <input
                        type="text"
                        name="phone"
                        className="outline-none p-3 rounded-lg w-full"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
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
                    </div>
                  </div>

                  <div className="col-span-12">
                    <div className="flex border rounded-lg items-center bg-white">
                      <MessageIcon sx={{ color: "gray", margin: 1 }} />
                      <textarea
                        name="message"
                        className="outline-none p-3 rounded-lg w-full"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
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
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EnquiryHome;
