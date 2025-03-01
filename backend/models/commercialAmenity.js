const mongoose = require("mongoose");

const commercialAmenitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: [{
    type: String,
    required: true,
  }],
});

const CommercialAmenity = mongoose.model("CommercialAmenity", commercialAmenitySchema);

module.exports = CommercialAmenity;