import React from "react";
import { Link } from "react-router-dom";

import facebook from "../assets/icons/facebook.png";
import twitter from "../assets/icons/twitter.png";
import instagram from "../assets/icons/instagram.png";
import youtube from "../assets/icons/youtube.png";
import footerLogo from "../assets/img/Grow Infinity Logo White.png";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';

import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="bg-[#03002e] text-white">
      <div className="grid sm:grid-cols-12 gap-5 px-8 mt-10 max-w-[1280px] mx-auto">
        <div className="col-span-12 md:col-span-12 lg:col-span-3">
          <div className="flex justify-start">
            <img
              src={footerLogo}
              alt=""
              className="h-[60px] w-[180px] lg:w-[250px] object-contain"
            />
          </div>
          <p className="font-normal text-xs lg:text-sm py-3 text-justify leading-5 lg:leading-8">
            Grow infinity realtors is an accomplished real estate agent firm.
            Drawing from their years of experience they brings a strategic yet
            personal approach to the home buying, selling, and renting process.
          </p>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <div className="flex flex-col lg:items-center">
            <h2 className="font-poppins font-semibold  text-sm lg:text-lg  uppercase">
              Areas of Operations
            </h2>
            <ul className="font-normal text-xs lg:text-sm py-3 text-justify list-disc">
              <li className="my-2">Sector-150</li>
              <li className="my-2">Ghaziabad</li>
              <li className="my-2">Noida Expressway</li>
              <li className="my-2">Yamuna Expressway</li>
              <li className="my-2">Siddharth Vihar</li>
              <li className="my-2">Noida Extension</li>
            </ul>
          </div>
        </div>
        <div className="col-span-12 md:col-span-12 lg:col-span-3">
          <div className="flex flex-col">
            <h2 className="font-poppins font-semibold text-sm lg:text-lg uppercase">
              Contact Us
            </h2>
            
            <ul className="font-normal text-xs lg:text-sm py-3 text-justify">
              <li className="my-2">
                <BusinessIcon /><a href="https://maps.app.goo.gl/nYP8Ch5ubYtvFPwC7" target="_blank"> Plot No. BL-34, II Floor, Near Fitness Gym, Sector-116, Noida,
                Uttar Pradesh-201305</a>
              </li>
              <li className="my-2"><EmailIcon /><a href="mailto:growinfinityrealtor1@gmail.com?subject=Inquiry&body=Hello, I would like to know more about your services." target="_blank"> growinfinityrealtor1@gmail.com</a></li>
              <li className="my-2"><PhoneIcon /><a href="+tel:+919990052554" title="Click to call (works better on mobile)" target="_blank"> +91-9990052554</a></li>
            </ul>
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex flex-col justify-center items-start lg:items-end">
            <h2 className="font-poppins font-semibold lg:pe-8 text-sm lg:text-lg uppercase">
              Follow us
            </h2>
            <ul className="flex justify-center gap-4 items-center font-normal text-xs lg:text-sm py-3 text-justify">
              <li className="my-2 hover:scale-150 transition-transform">
                <a
                  href="https://www.facebook.com/p/Grow-Infinity-Realtors-100092248133482/?_rdr"
                  target="_blank"
                >
                  <div className="w-[30px] h-[30px]">
                    <img src={facebook} alt="facebook_logo" />
                  </div>
                </a>
              </li>
              <li className="my-2 hover:scale-150 transition-transform">
                <a href="#" target="_blank">
                  <div className="w-[30px] h-[30px]">
                    <img src={twitter} alt="twitter_logo" />
                  </div>
                </a>
              </li>
              <li className="my-2 hover:scale-150 transition-transform">
                <a
                  href="https://www.instagram.com/growinfinityrealtors_official/"
                  target="_blank"
                >
                  <div className="w-[30px] h-[30px]">
                    <img src={instagram} alt="instagram_logo" />
                  </div>
                </a>
              </li>
              <li className="my-2 hover:scale-150 transition-transform">
                <a href="#">
                  <div className="w-[30px] h-[30px]">
                    <img
                      src={youtube}
                      alt="youtube_logo"
                      />
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-9">
        <hr className="text-white opacity-100 w-[80%]" />
      </div>

      <div className="grid sm:grid-cols-12 py-4 text-center max-w-[1280px] mx-auto">
        <div className="sm:col-span-6 col-span-12 flex justify-center sm:mb-0 mb-3">
          <p className="text-xs lg:text-sm">
            © {new Date().getFullYear()} Grow Infinity Realtors. All Rights
            Reserved.
          </p>
        </div>
        <div className="sm:col-span-3 col-span-6 flex justify-center">
          <p className="text-xs lg:text-sm">
            <Link to="/privacy-policy">Privacy Policy</Link>
          </p>
        </div>
        <div className="sm:col-span-3 col-span-6 flex justify-center">
          <p className="text-xs lg:text-sm">Terms & conditions</p>
        </div>
      </div>
    </footer>
  );
};
