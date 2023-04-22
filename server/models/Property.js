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

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  img: {
    type: String,
  },
});

const PropertySchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, "country is required"],
  },
  city: {
    type: String,
    required: [true, "please provide the city where the property is located"],
  },
  createdBy: {
    name: {
      type: String,
    },
    id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    img: {
      type: String,
    },
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
  bathrooms: {
    type: Number,
    required: [true, "number of bathroom in the property must be provided"],
  },
  bedrooms: {
    type: Number,
    required: [true, "number of bedrooms in the property must be provided"],
  },
  images: {
    type: [String],
  },
  guests: {
    type: Number,
    required: [
      true,
      "number of guests allowed in the property must be provided",
    ],
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
