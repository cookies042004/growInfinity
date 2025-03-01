import React, { useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import growinfinity from "../../assets/img/Grow Infinity Logo White.png";
import { Menu, X } from "lucide-react"; // Modern icons

export const AdminNavbar = ({ mobileMenu, setMobileMenu }) => {
  const [profile, setProfile] = useState(false);
  const navigate = useNavigate();

  const handleProfile = () => setProfile(!profile);
  const signOut = () => {
    Cookies.remove("adminToken");
    navigate("/admin");
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow-md dark:bg-gray-900 dark:border-gray-700">
      <div className="px-5 py-3 flex justify-between items-center">
        {/* Left: Sidebar Toggle & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300"
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/admin/dashboard" className="flex items-center">
            <img src={growinfinity} alt="Logo" className="h-[40px] hidden dark:block" />
            <span className="text-xl font-semibold dark:hidden">GrowInfinity Realtors</span>
          </Link>
        </div>

        {/* Right: Profile Dropdown */}
        <div className="relative">
          <button
            onClick={handleProfile}
            className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
          >
            <img
              className="w-9 h-9 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="User"
            />
          </button>

          {/* Profile Dropdown Menu */}
          {profile && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <button
                onClick={signOut}
                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
