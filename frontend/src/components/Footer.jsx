import React from "react";
import { Link } from "react-router-dom";
import facebook from "../assets/icons/facebook.png";
import twitter from "../assets/icons/twitter.png";
import instagram from "../assets/icons/instagram.png";
import youtube from "../assets/icons/youtube.png";
import footerLogo from "../assets/img/Grow Infinity Logo White.png";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";

import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="px-4 pt-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-5">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
          <div className="md:max-w-md lg:col-span-2">
            <div className="flex justify-start bg-gray-800">
              <img
                src={footerLogo}
                alt=""
                className="h-[70px] w-[180px] lg:w-[250px] object-contain "
              />
            </div>
            <div className="mt-5 lg:max-w-sm">
              <p className="text-sm text-gray-800 text-justify leading-5 lg:leading-6">
                Grow infinity realtors is an accomplished real estate agent
                firm. Drawing from their years of experience they brings a
                strategic yet personal approach to the home buying, selling, and
                renting process.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-16 row-gap-8 lg:col-span-4 md:grid-cols-14">
            <div>
              <p className="font-semibold text-xl tracking-wide text-gray-800">
                Operational Zones
              </p>
              <ul className="mt-2 space-y-2 text-gray-800 ">
                <li className="my-2">Sector-150</li>
                <li className="my-2">Ghaziabad</li>
                <li className="my-2">Noida Expressway</li>
                <li className="my-2">Yamuna Expressway</li>
                <li className="my-2">Siddharth Vihar</li>
                <li className="my-2">Noida Extension</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-xl tracking-wide text-gray-800 ">
                Key Links
              </p>
              <ul className="mt-2 space-y-2 text-gray-800 ">
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>Terms & conditions</li>
                <li>Business</li>
                <li>Entertainment</li>
                <li>
                  <Link to="/Contact">Contact us</Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-xl tracking-wide text-gray-800 ">
                Let’s Connect
              </p>
              <ul className="mt-2 space-y-2 text-gray-800 ">
                <li className="my-2">
                  Plot No. BL-34, II Floor, Near Fitness Gym, Sector-116, Noida,
                  Uttar Pradesh-201305
                </li>
                <li className="my-2">growinfinityrealtor1@gmail.com</li>
                <li className="my-2">
                  <PhoneIcon />
                  <Link to="+tel:+919990052554" target="_blank">
                    {" "}
                    +91-9990052554
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between pt-5 pb-3 border-t border-gray-800 sm:flex-row">
          <p className="text-sm text-gray-800 ">
            © {new Date().getFullYear()} Grow Infinity Realtors. All Rights
            Reserved.
          </p>
          <div className="flex items-center mt-4 space-x-6 sm:mt-0">
            {/* Twitter */}
            <Link to="#" target="_blank">
              <div className="w-[30px] h-[30px]">
                <img src={twitter} alt="twitter_logo" />
              </div>
            </Link>

            {/* Instagram */}
            <Link
              to="https://www.instagram.com/growinfinityrealtors_official/"
              target="_blank"
            >
              <div className="w-[30px] h-[30px]">
                <img src={instagram} alt="instagram_logo" />
              </div>
            </Link>

            {/* Facebook */}
            <Link
              to="https://www.facebook.com/p/Grow-Infinity-Realtors-100092248133482/?_rdr"
              target="_blank"
            >
              <div className="w-[30px] h-[30px]">
                <img src={facebook} alt="facebook_logo" />
              </div>
            </Link>

            {/* YouTube */}
            <Link to="#" target="_blank">
              <div className="w-[30px] h-[30px]">
                <img src={youtube} alt="youtube_logo" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
