const mongoose = require("mongoose");

const Reservation = new mongoose.Schema({
  propertyId: {
    type: mongoose.Types.ObjectId,
    ref: "Property",
  },
  image: {
    type: String,
    required: [true, "property must be provided"],
  },
  propertyOwner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  reservedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  startDate: {
    type: String,
    required: [true, "Reservation Start date is required"],
  },
  endDate: {
    type: String,
    required: [true, "Reservation Start date is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
});

module.exports = Reservation;
