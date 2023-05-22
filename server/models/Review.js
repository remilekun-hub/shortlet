const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name must be provided"],
  },
  message: {
    type: String,
    required: [true, "review message must be provided"],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: String,
    required: [true, "your image is required"],
  },
  propertyId: {
    type: mongoose.Types.ObjectId,
    ref: "Property",
  },
});

module.exports = mongoose.model("Review", reviewSchema);
