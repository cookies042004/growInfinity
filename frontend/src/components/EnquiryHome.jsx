import React, { useState } from "react";
import { Cancel } from "@mui/icons-material";

function EnquiryHome() {
  const [isOpen, setIsOpen] = useState(false);
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
              className="font-medium uppercase py-4 px-2"
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
              <span className="text-2xl px-1">📩</span>
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
              <form>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="p-2 border rounded-2xl w-full"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="p-2 border rounded-2xl w-full"
                    required
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email Address"
                  className="p-2 border rounded-2xl w-full mt-3"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="p-2 border rounded-2xl w-full mt-3"
                  required
                />
                <textarea
                  placeholder="Message"
                  className="p-2 border rounded-2xl w-full mt-3"
                  rows="3"
                  required
                ></textarea>

                {/* Submit Button */}
                <div className="mt-4 flex justify-center">
                  <button
                    type="submit"
                    className="bg-[#03002E] text-white px-6 py-2 rounded-lg"
                    style={{ boxShadow: "0px 5.46px 13.27px 0px #00000080" }}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default EnquiryHome;
