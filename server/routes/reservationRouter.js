const express = require("express");
const router = express.Router();
const {
  createReservation,
  deleteMyTrip,
  getMyTrips,
  getMyReservations,
} = require("../controller/reservation");

router.route("/").get(getMyReservations).post(createReservation);
router.route("/trips/:id").get(getMyTrips).delete(deleteMyTrip);

module.exports = router;
