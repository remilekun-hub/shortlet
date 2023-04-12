const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name must be provided"],
  },
  message: {
    type: String,
    required: [true, "message must be provided"],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const PropertySchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, "country is required"],
  },
  address: {
    type: String,
    required: [true, "property address must be provided"],
  },
  name: {
    type: String,
    required: [true, "property name must be provided"],
  },
  city: {
    type: String,
    required: [true, "please provide the city where the property is located"],
  },
  price: {
    type: Number,
    required: [true, "price per night must be provided"],
  },
  title: {
    type: String,
    required: [true, "property title is required"],
  },
  bed: {
    type: Number,
    required: [true, "number of beds in the property must be provided"],
  },
  bath: {
    type: Number,
    required: [true, "number of bathroom in the property must be provided"],
  },
  bedroom: {
    type: Number,
    required: [true, "number of bedrooms in the property must be provided"],
  },
  photos: {
    type: [String],
  },
  description: {
    type: String,
    required: [true, "property description must be provided"],
  },
  reviews: [reviewSchema],
  ameneties: {
    type: [String],
  },
});

module.exports = mongoose.model("Property", PropertySchema);
