import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import {
  Calculate as CalculateIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { Calculator } from "./Calculator";
import { Link } from "react-router-dom";

export const Layout = ({ children }) => {
  const [hoverReview, setHoverReview] = useState(false);
  const [hoverCalc, setHoverCalc] = useState(false);
  const [hoverWhatsapp, setHoverWhatsapp] = useState(false);

  const [mobileMenu, setMobileMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [calculator, setCalculator] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />

      {/* Main Content */}
      <div className="flex-1">
        <main>{children}</main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Floating Buttons */}
      <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end gap-3">
        {isOpen && (
          <>
            {/* WhatsApp Button */}
            <div className="relative flex items-center">
              {/* WhatsApp Icon */}
              <div
                className="flex items-center space-x-2"
                onMouseEnter={() => setHoverWhatsapp(true)}
                onMouseLeave={() => setHoverWhatsapp(false)}
              >
                <Link
                  to="https://wa.me/+918750238581?text=Hello!%20I%20would%20like%20to%20inquire%20about%20your%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-transform transform bg-gradient-to-r from-indigo-900 to-black flex items-center justify-center"
                >
                  <img
                    src="/src/assets/img/whatsapp.jpg"
                    alt="WhatsApp"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </Link>

                {/* Expanding Text on Hover */}
                <div
                  className={`absolute right-16 bg-gradient-to-r from-indigo-900 to-black text-white text-sm px-4 py-3 rounded-full shadow-lg transition-all duration-100 ${
                    hoverWhatsapp
                      ? "opacity-100 w-[150px]"
                      : "opacity-0 w-0 overflow-hidden"
                  }`}
                >
                  Chat on WhatsApp
                </div>
              </div>
            </div>

            {/* Google Review Button */}
            <div className="relative flex items-center">
              {/* Google Review Icon */}
              <div
                className="flex items-center space-x-2"
                onMouseEnter={() => setHoverReview(true)}
                onMouseLeave={() => setHoverReview(false)}
              >
                <Link
                  to="https://www.google.com/search?q=grow+infinity+realtors&rlz=1C1ONGR_enIN1124IN1124&oq=grow+infinity+realtors&gs_lcrp=EgZjaHJvbWUqDwgAECMYJxjjAhiABBiKBTIPCAAQIxgnGOMCGIAEGIoFMhUIARAuGCcYrwEYxwEYgAQYigUYjgUyBwgCEAAYgAQyCggDEAAYgAQYogQyCggEEAAYgAQYogQyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQg3NjY2ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#lrd=0x2f7b6f8aa4bbbca1:0xcd4a6a4f021202d4,3,,,,"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-transform transform bg-gradient-to-r from-indigo-900 to-black flex items-center justify-center"
                >
                  <img
                    src="/src/assets/img/google.jpg"
                    alt="Google"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </Link>

                {/* Expanding Text on Hover */}
                <div
                  className={`absolute right-16 bg-gradient-to-r from-indigo-900 to-black text-white text-sm px-4 py-3 rounded-full shadow-lg transition-all duration-100 ${
                    hoverReview
                      ? "opacity-100 w-[200px]"
                      : "opacity-0 w-0 overflow-hidden"
                  }`}
                >
                  Check our Google Reviews
                </div>
              </div>
            </div>

            {/* EMI Calculator Toggle */}
            <div className="relative flex items-center">
              {/* EMI Calculator Button */}
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onMouseEnter={() => setHoverCalc(true)}
                onMouseLeave={() => setHoverCalc(false)}
                onClick={() => setCalculator(!calculator)}
              >
                <div className="w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-transform transform bg-gradient-to-r from-indigo-900 to-black flex items-center justify-center">
                  {calculator ? (
                    <CancelIcon sx={{ fontSize: "30px", color: "#fff" }} />
                  ) : (
                    <CalculateIcon sx={{ fontSize: "30px", color: "#fff" }} />
                  )}
                </div>
                {/* Expanding Text on Hover */}
                <div
                  className={`hidden absolute right-16 bg-gradient-to-r from-teal-800 to-teal-600 text-white text-sm px-4 py-3 rounded-full shadow-lg transition-all duration-100 ${
                    hoverCalc
                      ? "opacity-100 w-[120px]"
                      : "opacity-0 w-0 overflow-hidden"
                  }`}
                ></div>
                {calculator ? (
                  ""
                ) : (
                  <div
                    className={` absolute right-16 bg-gradient-to-r from-indigo-900 to-black text-white text-sm px-4 py-3 rounded-full shadow-lg transition-all duration-100 ${
                      hoverCalc
                        ? "opacity-100 w-[120px]"
                        : "opacity-0 w-0 overflow-hidden"
                    }`}
                  >
                    Calculate EMI
                  </div>
                )}
              </div>

              {/* Calculator Component */}
              {calculator && <Calculator />}
            </div>
          </>
        )}

        {/* Toggle Floating Buttons */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-transform transform bg-gradient-to-r from-indigo-900 to-black flex items-center justify-center"
        >
          {isOpen ? (
            <CancelIcon sx={{ fontSize: "30px", color: "#fff" }} />
          ) : (
            <img
              src="/src/assets/img/Animation-icon.gif" // Add your GIF file here
              alt="Toggle Menu"
              className="w-full h-full rounded-full object-cover bg-gradient-to-r from-indigo-900 to-black"
            />
          )}
        </button>
      </div>
    </div>
  );
};
