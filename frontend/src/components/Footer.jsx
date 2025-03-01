import React from "react";
import { Link } from "react-router-dom";
import facebook from "../assets/icons/facebook.png";
import twitter from "../assets/icons/twitter.png";
import instagram from "../assets/icons/instagram.png";
import youtube from "../assets/icons/youtube.png";
import footerLogo from "../assets/img/Grow Infinity Logo White.png";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        {/* Logo & About */}
        <div style={columnStyle}>
          <img src={footerLogo} alt="Grow Infinity Realtors" style={logoStyle} />
          <p style={textStyle}>
            Grow Infinity Realtors is an accomplished real estate firm. With years of experience, 
            we bring a strategic yet personal approach to home buying, selling, and renting.
          </p>
        </div>

        {/* Operational Zones */}
        <div style={columnStyle}>
          <p style={titleStyle}>Operational Zones</p>
          <ul style={listStyle}>
            {["Sector-150", "Ghaziabad", "Noida Expressway", "Yamuna Expressway", "Siddharth Vihar", "Noida Extension"].map((zone, index) => (
              <li key={index} style={listItemStyle}>{zone}</li>
            ))}
          </ul>
        </div>

        {/* Key Links */}
        <div style={columnStyle}>
          <p style={titleStyle}>Key Links</p>
          <ul style={listStyle}>
            <li style={listItemStyle}><Link to="/privacy-policy" style={linkStyle}>Privacy Policy</Link></li>
            <li style={listItemStyle}>Terms & Conditions</li>
            <li style={listItemStyle}>Business</li>
            <li style={listItemStyle}>Entertainment</li>
            <li style={listItemStyle}><Link to="/Contact" style={linkStyle}>Contact Us</Link></li>
          </ul>
        </div>

        {/* Keep in Touch */}
        <div style={columnStyle}>
          <p style={titleStyle}>Keep in Touch</p>
          <ul style={listStyle}>
            <li style={contactItemStyle}>
              <LocationOnIcon style={iconStyle} />
              Plot No. BL-34, II Floor, Near Fitness Gym, Sector-116, Noida, Uttar Pradesh-201305
            </li>
            <li style={contactItemStyle}>
              <EmailIcon style={iconStyle} />
              growinfinityrealtor1@gmail.com
            </li>
            <li style={contactItemStyle}>
              <PhoneIcon style={iconStyle} />
              <Link to="tel:+91-9990052554">+91-9990052554</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div style={footerBottomStyle}>
        <p style={{ fontSize: "14px" }}>
          © {new Date().getFullYear()} Grow Infinity Realtors. All Rights Reserved.
        </p>

        {/* Social Media Links */}
        <div style={socialContainerStyle}>
          {[
            { img: twitter, url: "#" },
            { img: instagram, url: "https://www.instagram.com/growinfinityrealtors_official/" },
            { img: facebook, url: "https://www.facebook.com/p/Grow-Infinity-Realtors-100092248133482/?_rdr" },
            { img: youtube, url: "#" },
          ].map((social, index) => (
            <Link to={social.url} key={index} target="_blank">
              <img src={social.img} alt="social" style={socialIconStyle} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

// Styles
const footerStyle = {
  backgroundColor: "#121826",
  color: "#e5e7eb",
  padding: "50px 0",
  fontFamily: "'Poppins', sans-serif",
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "auto",
  padding: "0 1rem",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "2rem",
};

const columnStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const logoStyle = {
  height: "70px",
  width: "180px",
  objectFit: "contain",
  marginBottom: "15px",
};

const titleStyle = {
  fontSize: "1.2rem",
  fontWeight: "600",
  color: "#fff",
  marginBottom: "10px",
};

const textStyle = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#9ca3af",
};

const listStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
};

const listItemStyle = {
  fontSize: "14px",
  color: "#9ca3af",
  marginBottom: "6px",
  transition: "color 0.3s ease",
};

const linkStyle = {
  textDecoration: "none",
  color: "#facc15",
  transition: "color 0.3s",
};

const contactItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
  color: "#9ca3af",
  marginBottom: "8px",
};

const iconStyle = {
  color: "#facc15",
  fontSize: "18px",
};

const footerBottomStyle = {
  maxWidth: "1200px",
  margin: "auto",
  padding: "1rem 0",
  borderTop: "1px solid #374151",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "14px",
  color: "#9ca3af",
};

const socialContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const socialIconStyle = {
  width: "30px",
  height: "30px",
  transition: "transform 0.3s ease",
};

export default Footer;
