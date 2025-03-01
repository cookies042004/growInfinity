const mongoose = require("mongoose");
const slugify = require("slugify")

const commercialPropertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    builder: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    amenities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommercialAmenity",
        required: true,
    }, ],
    size: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    sizeUnit: {
        type: String,
        required: true,
    },
    image: {
        type: [String],
        required: true,
    },
    video: {
        type: [String],
        required: true,
    },
    dp: {
        type: [String],
        required: true,
    },
    projectStatus: {
        type: String,
        required: true,
    },
    projectSize: {
        type: String,
        required: true,
    },
    propertyType: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true
    }
});

commercialPropertySchema.pre("save", function (next) {
    this.slug = slugify(`${this.title}-${this.location}`, {
        lower: true,
        strict: true
    });
    next();
});

const CommercialProperty = mongoose.model('CommercialProperty', commercialPropertySchema);
module.exports = CommercialProperty;