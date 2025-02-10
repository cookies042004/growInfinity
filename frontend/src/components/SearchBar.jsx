import React, { useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import Slider from "@mui/material/Slider";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [property, setProperty] = useState(false);
  const [bhk, setBhk] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Sale");
  const [bhkValue, setBhkValue] = useState("4 BHK");
  const navigate = useNavigate();

  const options = ["Sale", "Purchase"];
  const bhkOptions = ["2 BHK", "3 BHK", "4 BHK"]; // Add BHK options here

  const handleBhkClick = (value) => {
    setBhkValue(value);
    setBhk(false);
  };

  const handleOptionClick = (value) => {
    setSelectedValue(value);
    setProperty(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if(!searchQuery){
      return alert("Please enter name or location");
     }
    try {
      navigate(`/search/${searchQuery}`);
    } catch (error) {
      console.log(error);
    }
  };

  const [value, setValue] = useState([60, 1400]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <form onSubmit={handleSearch} style={{ width: "90%", maxWidth: "100%", margin: "auto" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "13px",
          boxShadow: "0px 16px 33px 0px #0000001A",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        {/* Property Dropdown */}
        <div style={{ position: "relative", width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
          <button
            style={{
              backgroundColor: "#F4F4F4",
              fontSize: "16px",
              padding: "10px",
              width: "50%",
              borderRadius: "17px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setProperty(!property)}
            type="button"
          >
            <HomeOutlinedIcon style={{ color: "#03002E" }} />
            {selectedValue}
          </button>
          {property && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                backgroundColor: "white",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                width: "100%",
                borderRadius: "10px",
                zIndex: "10",
              }}
            >
              <ul style={{ listStyle: "none", margin: 0, padding: "10px" }}>
                {options.map((option) => (
                  <li
                    key={option}
                    style={{
                      padding: "8px",
                      cursor: "pointer",
                      borderBottom: "1px solid #ddd",
                    }}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* BHK Dropdown */}
        <div style={{ position: "relative", width: "50%" }}>
          <button
            style={{
              backgroundColor: "#F4F4F4",
              fontSize: "16px",
              padding: "10px",
              borderRadius: "17px",
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setBhk(!bhk)}
            type="button"
          >
            <HomeIcon style={{ color: "#03002E", marginRight: "8px" }} />
            {bhkValue}
          </button>
          {bhk && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                backgroundColor: "white",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                width: "100%",
                borderRadius: "10px",
                zIndex: "10",
              }}
            >
              <ul style={{ listStyle: "none", margin: 0, padding: "10px" }}>
                {bhkOptions.map((option) => (
                  <li
                    key={option}
                    style={{
                      padding: "8px",
                      cursor: "pointer",
                      borderBottom: "1px solid #ddd",
                    }}
                    onClick={() => handleBhkClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        </div>

        {/* Search Input */}
        <div style={{ width: "100%" }}>
          <input
            type="text"
            placeholder="Your desired location, project, city goes here"
            style={{
              backgroundColor: "#F4F4F4",
              borderRadius: "17px",
              padding: "10px",
              outline: "none",
              border: "none",
              width: "100%",
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
        </div>

        {/* Price Slider */}
        <div style={{ width: "100%", padding: "0 20px" }}>
          <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={60}
            max={1400}
            sx={{ color: "#03002E" }}
            valueLabelFormat={(val) =>
              val < 100 ? `₹${val} Lac` : `₹${(val / 100).toFixed(2)} Cr`
            }
            marks={[
              { value: 60, label: "₹ 60 Lac" },
              { value: 1400, label: "₹ 14 Cr" },
            ]}
          />
        </div>

        {/* Search Button */}
        <div style={{ width: "100%", textAlign: "center" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#03002E",
              color: "white",
              width: "100%",
              borderRadius: "8px",
              padding: "10px 20px",
              boxShadow: "0px 5px 13px 0px #03002E80",
              transition: "all 0.3s ease-in-out",
              border: "none",
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};
