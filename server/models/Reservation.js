const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Types.ObjectId,
    ref: "Property",
  },

  propertyOwner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  reservedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDate: {
    type: Date,
    required: [true, "Reservation Start date is required"],
  },
  endDate: {
    type: Date,
    required: [true, "Reservation Start date is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
});

module.exports = mongoose.model("Reservation", ReservationSchema);
