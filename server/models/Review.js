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
  // createdby: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "User",
  //   //required: [true],
  // },
  property: {
    type: mongoose.Types.ObjectId,
    ref: "Property",
  },
});

module.exports = mongoose.model("Review", reviewSchema);
