const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Types.ObjectId,
    ref: "Property",
  },
  image: {
    type: String,
    required: [true, "property image must be provided"],
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
  state: {
    type: String,
    required: [true, "state where the property is located must be provided"],
  },
  country: {
    type: String,
    required: [true, "country where the property is located must be provided"],
  },
  city: {
    type: String,
    required: [true, "city where the property is located must be provided"],
  },
});

module.exports = mongoose.model("Reservation", ReservationSchema);
