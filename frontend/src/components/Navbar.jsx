import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../assets/img/logo.png";

export const Navbar = ({ mobileMenu, setMobileMenu }) => {
  document.title = "Grow Infinity Realtors";

  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle scroll event for sticky navbar
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "null" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [mobileMenu]);

  const handleLinkClick = () => {
    setMobileMenu(false);
    window.scrollTo(0, 0); // Ensure the page scrolls to the top
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about" },
    { name: "Events", path: "/events" },
    { name: "Services", path: "/services" },
    { name: "News", path: "/news" },
    { name: "Contact us", path: "/contact" },
    { name: "Brochure", path: "/brochure" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed z-[1000] top-0 shadow-lg transition-all duration-500 w-full ${
          isSticky
            ? "bg-white p-1 shadow-md"
            : "lg:w-[90%] lg:left-[5%] lg:top-[8%] lg:rounded-[25px] bg-[#FFFFFF80]"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <Link to="/">
            <img src={logo} alt="Logo" width={isSticky ? 200 : 200} />
          </Link>
          <ul className="hidden lg:flex gap-10">
            {navItems.slice(0, 6).map((item, index) => (
              <li key={index} className="font-dmsans font-[12.49px]">
                <NavLink to={item.path} onClick={handleLinkClick}>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link
            to="/brochure"
            className="hidden lg:block font-dmsans px-10 py-2 bg-[#03002E] text-white rounded-[16.5px] uppercase shadow-md"
            style={{ boxShadow: "0px 5.46px 13.27px 0px #00000080" }}
          >
            Brochure
          </Link>
          {isMobile && (
            <IconButton
              sx={{ color: "#1b1364" }}
              size="large"
              aria-label="mobile-menu"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <nav
        className={`fixed z-[100] h-screen bg-white w-[70%] text-black transform  ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mx-3">
            {/* <Link to="/" onClick={handleLinkClick}>
              <img src={logo} alt="Logo" width={150} />
            </Link> */}
            <IconButton
              sx={{ color: "#1b1364" }}
              size="large"
              aria-label="close-menu"
              onClick={() => setMobileMenu(false)}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <ul className="flex flex-col ms-5 mt-10 gap-10">
            {navItems.map((item, index) => (
              <li key={index} className="font-dmsans font-[12.49px]">
                <NavLink
                  to={item.path}
                  onClick={handleLinkClick}
                  className="hover:text-blue-600"
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};
