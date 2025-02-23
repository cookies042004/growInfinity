const axios = require("axios");
require("dotenv").config();

const getReviews = async (req, res) => {
    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.PLACEID}&fields=name,rating,reviews&key=${process.env.APIKEY}`;
        
        const response = await axios.get(url);
        console.log(response.data.result);
        res.json(response.data.result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
};

module.exports = { getReviews };
