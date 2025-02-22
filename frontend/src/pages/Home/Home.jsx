import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";

import "./Home.css";
import ApartmentIcon from "@mui/icons-material/Apartment";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";

import { Choose } from "../../components/Choose";
import { Testimonials } from "../../components/Testimonials";

import { Typewriter } from "react-simple-typewriter";

import PureCounter from "@srexi/purecounterjs";
import { Link } from "react-router-dom";
import Icon1 from "../../assets/img/Icon.png";
import Icon2 from "../../assets/img/Icon (1).png";
import Icon3 from "../../assets/img/Icon (2).png";
import home from "../../assets/img/home.png";
import house from "../../assets/img/house.png";
import EastIcon from "@mui/icons-material/East";
import { Card } from "../../components/Card";
import { PropertyCard1 } from "../../components/PropertyCard1";
import { Button } from "@mui/material";
import { Marquee } from "../../components/Marquee";
import { LatestNews } from "../../components/LatestNews";
import { Calculator } from "../../components/Calculator";
import { SearchBar } from "../../components/SearchBar";
import findRealEstate from "../../assets/img/find real estate.jpg";
import keys from "../../assets/img/keys.jpeg";
import realtor from "../../assets/img/meet realtor.jpeg";
import bgImage from "/src/assets/img/img4.jpg";
import EnquiryHome from "../../components/EnquiryHome";
import { Awards } from "../Awards/Awards";
import { AwardComponent } from "../../components/AwardComponent";

export const Home = () => {
  return (
    <Layout>
      {/* Hero  */}
      <div className="homeBanner overflow-hidden relative h-screen flex flex-col items-center lg:items-start justify-center lg:ps-24 ">
        <div className="text-center">
          <h1 className="text-2xl lg:text-4xl font-medium mt-14 lg:mt-24">
            Find your next{" "}
            <Typewriter
              words={["best cozy place", "dream home", "office"]}
              loop={0}
              cursor
            />
          </h1>
        </div>
        <div className="my-5 lg:my-10">
          <p className="font-dmsans text-center font-normal text-sm lg:text-lg lg:text-left px-5 lg:px-0">
            Find the best places around you at the cheapest and affordable
            prices.
          </p>
        </div>
        <SearchBar />

        {/* Floating Button to Open Modal */}
        <EnquiryHome />
      </div>

      <div className="block lg:hidden p-5">
        <Calculator />
      </div>

      {/* Explore Our Properties */}
      <div
        className="bg-white
      "
      >
        <h1 className="text-center text-black lg:text-4xl text-2xl font-bold py-8 lg:font-medium">
          Explore Our Properties
        </h1>
        <div className="flex justify-center gap-5 p-8">
          <PropertyCard1
            title="Luxury Living"
            category="luxury"
            image="luxury-living.jpg"
          />
          <PropertyCard1
            title="New Launches"
            category="newLaunches"
            image="new-launches.jpg"
          />
          <PropertyCard1
            title="Affordable Living"
            category="affordable"
            image="affordable.jpg"
          />
          <PropertyCard1
            title="Commercial"
            category="commercial"
            image="commercial.jpg"
          />
        </div>
      </div>

      {/* More than 10 years of experience  */}
      <div
        className="bg-[#03002e] text-white my-10 experience"
        style={{
          background: `linear-gradient(#0e1d3499, #0e1d34cc), url(${bgImage})`,
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-[1280px] mx-auto py-10">
          <h1 className="text-xl text-center lg:text-4xl font-poppins font-bold py-4">
            More than{" "}
            <span className="text-red-500 transition-transform transform hover:text-200">
              10 Years
            </span>{" "}
            of Experience
          </h1>
          <div className="relative w-full overflow-hidden">
            <marquee
              direction="left"
              className="text-sm py-3 lg:py-5 text-center lg:text-lg font-poppins font-medium lg:me-10 me-0 px-3 lg:px-0"
            >
              <span className="transition-all duration-300 hover:text-xl hover:font-bold">
                Over the years,{" "}
                <span className="text-red-500">Grow Infinity</span> has built a
                reputation for providing a{" "}
                <span className="text-yellow-200">seamless experience</span> to
                customers to secure their{" "}
                <span className="text-red-500">dream homes</span>.
              </span>
            </marquee>
          </div>
          <div className="flex flex-wrap justify-center lg:grid sm:grid-cols-12">
            {[
              {
                Icon: ApartmentIcon,
                count: 2000,
                suffix: "+",
                label: "Units Sold",
              },
              {
                Icon: EmojiEmotionsIcon,
                count: 1500,
                suffix: "+",
                label: "Happy Users",
                color: "text-yellow-200",
              },
              {
                Icon: AspectRatioIcon,
                count: 10,
                suffix: "+",
                label: "Years of Experience",
              },
              {
                Icon: AccessibilityNewIcon,
                count: 30,
                label: "Employees",
                color: "text-yellow-200",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="basis-1/4 col-span-6 md:col-span-6 lg:col-span-3 rounded-[17.07px] m-8 hover:text-white transition-all ease-in-out experience-card"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div
                  className="flex flex-col items-center justify-center  animate-move rounded-xl"
                  style={{ boxShadow: "0px 4px 20px rgba(159, 154, 154, 0.9)" }}
                >
                  <item.Icon
                    sx={{
                      fontSize: { xs: 50, sm: 75, md: 100 },
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      transition: "color 0.3s ease-in-out",
                    }}
                    className={`experience-icon ${item.color}`}
                  />
                  <div className="flex flex-col gap-1 my-4">
                    <p className="font-poppins font-semibold text-xl lg:text-2xl text-center">
                      <span
                        className="purecounter"
                        data-purecounter-start="0"
                        data-purecounter-end={item.count}
                        data-purecounter-duration="3"
                      >
                        {item.count}
                      </span>
                      {item.suffix && <span>{item.suffix}</span>}
                    </p>
                    <p className="font-poppins font-medium text-sm lg:text-lg">
                      {item.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Listings  */}
      <div className="bg-white">
        <h1 className="text-center text-black  text-2xl lg:text-4xl font-bold py-8 lg:font-medium">
          Recent Listings
        </h1>
        <Card category="Affordable Living" />
        <div className="flex justify-center py-8">
          <Link to={"/property/affordable-living"}>
            <Button
              size="large"
              variant="contained"
              endIcon={<EastIcon />}
              sx={{
                backgroundColor: "#03002e",
                color: "white",
                textTransform: "none",
              }}
            >
              View all
            </Button>
          </Link>
        </div>
      </div>

      {/* How it Works */}
      <div className="mx-auto max-w-[1280px] my-10">
        <div className="grid sm:grid-cols-12">
          <div className="hidden md:flex col-span-12 md:col-span-6 lg:col-span-7 justify-center">
            <div className="grid sm:grid-cols-12">
              <div className="col-span-12">
                <div className="grid sm:grid-cols-12">
                  <div className="col-span-8 m-5">
                    <img
                      src={findRealEstate}
                      alt=""
                      className="rounded-lg h-[250px] w-[1000px] object-fill"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-12">
                <div className="grid sm:grid-cols-12">
                  <div className="col-span-5 mx-5">
                    <img
                      src={realtor}
                      alt=""
                      className="rounded-lg h-[260px] w-full object-cover"
                    />
                  </div>
                  <div className="col-span-5">
                    <img
                      src={keys}
                      alt=""
                      className="rounded-lg h-[260px] w-full object-fill"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6  lg:col-span-5 flex flex-col justify-center lg:ps-14">
            <h1 className="px-5 text-[#1A1A1A] font-roboto  text-2xl lg:text-4xl font-medium text-center lg:text-start mt-4 lg:mt-0">
              How It works? <br />
              Find a perfect home
            </h1>
            <p className="text-md lg:text-lg px-5 mt-5">
              Discover your ideal home with ease. Browse listings, get expert
              advice, and find the perfect match for your lifestyle.
            </p>
            <ul className="my-10 flex flex-col gap-10 lg:mx-0 mx-5 ps-6 lg:ps-4">
              <li>
                <div className="flex gap-5">
                  <div className="relative basis-[10%]">
                    <img src={Icon1} alt="" className="w-[35px] h-[35px]" />
                    <div className="bg-[#e7c873b8] absolute h-[30px] w-[30px] rounded-[50%] left-[-8px] top-[8%]"></div>
                  </div>
                  <div className="flex-col basis-[90%]">
                    <h1 className="text-lg lg:text-xl font-medium ">
                      Find Real Estate
                    </h1>
                    <p className="mt-2 text-sm lg:text-[15px]">
                      Finding your dream property has never been easier. With
                      Grow Infinity Realtors, you access extensive listings, and
                      expert guidance for a seamless real estate journey. Start
                      exploring today and discover your perfect home.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex gap-5">
                  <div className="relative basis-[10%]">
                    <img src={Icon2} alt="" className="w-[35px] h-[35px]" />
                    <div className="bg-[#e7c873b8] absolute h-[30px] w-[30px] rounded-[50%] left-[-8px] top-[10%]"></div>
                  </div>
                  <div className="flex-col basis-[90%]">
                    <h1 className="text-lg lg:text-xl font-medium">
                      Meet Realtor
                    </h1>
                    <p className="mt-2 text-sm lg:text-[15px]">
                      Connect with trusted real estate professionals who
                      understand your needs and priorities.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex gap-5">
                  <div className="relative basis-[10%]">
                    <img src={Icon3} alt="" className="w-[35px] h-[35px]" />
                    <div className="bg-[#e7c873b8] absolute h-[30px] w-[30px] rounded-[50%] left-[-8px] top-[10%]"></div>
                  </div>
                  <div className="flex-col basis-[90%]">
                    <h1 className="text-lg lg:text-xl font-medium">
                      Take the keys
                    </h1>
                    <p className="mt-2 text-sm lg:text-[15px]">
                      Unlock your future with confidence. Take the Home Keys and
                      step into your new beginning with expert guidance and
                      support.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Testimonials />
      <Choose />

      {/* Awards Segment  */}
      <div
        className="bg-latest py-10"
        style={{
          background: `linear-gradient(#0e1d3499, #0e1d34cc), url(${bgImage})`,
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4">
          <h1 className="text-center text-3xl lg:text-4xl text-white font-medium mb-6">
            Awards
          </h1>
          <div className="grid sm:grid-cols-1 lg:grid gap-8">
            {/* Award Images Section */}
            <div className="flex justify-center lg:justify-start">
              <AwardComponent />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Link to="/awards">
              <Button
                size="large"
                variant="contained"
                endIcon={<EastIcon />}
                sx={{
                  backgroundColor: "white",
                  color: "#03002e",
                  textTransform: "none",
                }}
              >
                View all
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Both Boxes */}
      <div className="max-w-[1280px] mx-auto my-10">
        <div className="grid sm:grid-cols-12">
          {/* Box 1 - Looking for a new home */}
          <div className="col-span-12 lg:col-span-6 m-5">
            <div
              className="bg-[#F9F9F9] font-roboto p-8 lg:p-14 rounded-lg 
                      transition-all duration-500 hover:translate-x-4 hover:shadow-lg hover:scale-[1.02]"
            >
              <div className="grid sm:grid-cols-12">
                <div className="col-span-12 lg:col-span-9">
                  <div className="flex flex-col gap-4">
                    <h4 className="font-medium text-lg lg:text-2xl">
                      Looking for a new home?
                    </h4>
                    <p className="hidden lg:block text-sm lg:text-lg font-normal lg:pe-20 text-justify">
                      Let us help you find the perfect place to suit your needs
                      and lifestyle.
                    </p>
                    <div className="flex lg:hidden justify-between">
                      <p className="basis-[60%] text-sm lg:text-lg font-normal lg:pe-20 text-justify">
                        Let us help you find the perfect place to suit your
                        needs and lifestyle.
                      </p>
                      <img
                        src={home}
                        alt="Home"
                        className="w-[80px] h-[80px]"
                      />
                    </div>
                    <Link to={"/contact"}>
                      <button
                        className="bg-[#1F4B43] rounded-lg text-white w-[50%] lg:w-[150px] text-sm py-1 lg:py-3 
                                    flex items-center justify-center gap-2 mt-8 transition-all duration-300 hover:scale-105"
                      >
                        Contact us
                        <EastIcon size="small" sx={{ fontSize: "15px" }} />
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-3 hidden lg:flex items-end">
                  <img src={home} alt="Home" className="w-[130px] h-[130px]" />
                </div>
              </div>
            </div>
          </div>

          {/* Box 2 - Want to sell your home? */}
          <div className="col-span-12 lg:col-span-6 m-5">
            <div
              className="bg-[#FFF8F6] font-roboto p-8 lg:p-14 rounded-lg 
                      transition-all duration-300 hover:translate-x-4 hover:shadow-lg hover:scale-[1.02]"
            >
              <div className="grid sm:grid-cols-12">
                <div className="col-span-12 lg:col-span-9">
                  <div className="flex flex-col gap-4">
                    <h4 className="font-medium text-lg lg:text-2xl">
                      Want to sell your home?
                    </h4>
                    <p className="hidden lg:block text-sm lg:text-lg font-normal lg:pe-20 text-justify">
                      Let our experts help you get the best price with a
                      seamless selling experience.
                    </p>
                    <div className="flex lg:hidden justify-between">
                      <p className="basis-[60%] text-sm lg:text-lg font-normal lg:pe-20 text-justify">
                        Let our experts help you get the best price with a
                        seamless selling experience.
                      </p>
                      <img
                        src={house}
                        alt="House"
                        className="w-[80px] h-[80px]"
                      />
                    </div>
                    <Link to={"/contact"}>
                      <button
                        className="bg-[#1F4B43] rounded-lg text-white w-[50%] lg:w-[150px] text-sm py-1 lg:py-3 
                                    flex items-center justify-center gap-2 mt-8 transition-all duration-300 hover:scale-105"
                      >
                        Contact us
                        <EastIcon size="small" sx={{ fontSize: "15px" }} />
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-3 hidden lg:flex items-end">
                  <img
                    src={house}
                    alt="House"
                    className="w-[130px] h-[130px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Marquee />
    </Layout>
  );
};
