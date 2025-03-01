import React, { useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import { Layout } from "../../components/Layout";

import contactImg from "../../assets/img/aboutImg2.png";

import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { Button } from "@mui/material";
import { MailOutlineOutlined, PersonOutlineOutlined, Phone } from "@mui/icons-material";
  

export const Contact = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/contact`;
  console.log(apiUrl);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false); // To manage loading state

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // dynamically update the state
    });
  };

  // Validate form data
  const validateForm = () => {
    const { name, email, phone, message } = formData;

    if (!name || !phone) {
      toast.error("Please fill in all fields.");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number.");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (!validateForm()) {
      return; // If validation fails, don't submit
    }

    setLoading(true); // Set loading state to true when submitting

    try {
      // Post formData to the backend API
      const response = await axios.post(apiUrl, formData);

      if (response.data.success) {
        toast.success(response.data.success.message); // Show success toast
        // Optionally, clear the form after submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again.");
    } finally {
      toast.success("Message sent successfully!");
      setLoading(false); // Set loading state back to false after submission
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <Layout>
        {/* Contact Hero  */}
        <div className="contactbanner flex items-center justify-center">
          <div className="grid sm:grid-cols-12">
            <div className="col-span-12 text-center mt-10 lg:mt-20 flex justify-center items-center">
              <h1 className="font-dmsans text-3xl lg:text-4xl font-medium text-white">
                Contact Us
              </h1>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Contact Info Cards */}
        <div className="grid sm:grid-cols-12 gap-6">
          {[
            { icon: <EmailIcon fontSize="large" />, title: "Chat to us", subtitle: "Our friendly team is here to help.", text: "growinfinityrealtor1@gmail.com, info@growinfinityrealtors.in" },
            { icon: <LocationOnIcon fontSize="large" />, title: "Office", subtitle: "Come say hello at our HQ.", text: "Plot No. BL-34, II Floor, Near Fitness Gym, Sector-116, Noida, Uttar Pradesh-201305" },
            { icon: <LocalPhoneIcon fontSize="large" />, title: "Phone", subtitle: "Mon-Sun from 8am to 6pm", text: "+91-9990052554" }
          ].map((card, index) => (
            <div key={index} className="col-span-12 md:col-span-6 lg:col-span-4">
              <div className="flex flex-col items-center bg-white p-6 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="flex items-center justify-center bg-darkBlue text-white rounded-full w-16 h-16 lg:w-20 lg:h-20">
                  {card.icon}
                </div>
                <p className="font-semibold text-xl mt-4">{card.title}</p>
                <p className="text-lg text-primary">{card.subtitle}</p>
                <p className="text-md text-center text-gray-600 mt-2">{card.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form & Map */}
        <div className="grid sm:grid-cols-12 gap-6 mt-10">
          
          {/* Contact Form */}
          <div className="col-span-12 lg:col-span-6 bg-white shadow-lg rounded-3xl p-8">
            <h1 className="text-3xl font-semibold text-center">Let's Get In Touch</h1>
            <p className="text-center text-lg py-3">
              Or reach us at{" "}
              <a href="mailto:info@growinfinityrealtors.in" className="text-primary font-medium">
                info@growinfinityrealtors.in
              </a>
            </p>

            <form onSubmit={handleSubmit} className="mt-5">
              <div className="grid gap-5">
                
                {/* Full Name */}
                <div>
                  <label className="block text-gray-700 font-medium">Full Name</label>
                  <div className="flex items-center border border-gray-300 rounded-3xl bg-gray-50 px-4 py-3 shadow-md hover:shadow-lg transition-all">
                    <PersonOutlineOutlined className="text-gray-500" />
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your full name..." className="ml-2 bg-transparent w-full outline-none" />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-gray-700 font-medium">Email Address</label>
                  <div className="flex items-center border border-gray-300 rounded-3xl bg-gray-50 px-4 py-3 shadow-md hover:shadow-lg transition-all">
                    <MailOutlineOutlined className="text-gray-500" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email..." className="ml-2 bg-transparent w-full outline-none" />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-gray-700 font-medium">Phone Number</label>
                  <div className="flex items-center border border-gray-300 rounded-3xl bg-gray-50 px-4 py-3 shadow-md hover:shadow-lg transition-all">
                    <Phone className="text-gray-500" />
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} required maxLength={10} minLength={10} placeholder="Enter your phone..." className="ml-2 bg-transparent w-full outline-none" />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-700 font-medium">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Enter your message here..." className="w-full p-3 border border-gray-300 rounded-3xl bg-gray-50 shadow-md hover:shadow-lg transition-all outline-none" rows={5}></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button type="submit" className="bg-darkBlue text-white px-6 py-3 rounded-3xl hover:bg-primary transition-all duration-300" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Form"}
                  </button>
                </div>

              </div>
            </form>
          </div>

          {/* Google Map */}
          <div className="col-span-12 lg:col-span-6 flex justify-center">
            <div className="w-full shadow-lg rounded-3xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14016.248411720519!2d77.3950231!3d28.5678978!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2f7b6f8aa4bbbca1%3A0xcd4a6a4f021202d4!2sGrow%20Infinity%20Realtors!5e0!3m2!1sen!2sin!4v1730825249194!5m2!1sen!2sin"
                className="border-0 w-full h-[690px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
      </Layout>
    </>
  );
};
