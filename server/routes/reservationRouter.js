const express = require("express");
const { authentication } = require("../middleware/authentication");
const router = express.Router();
const {
  createReservation,
  getPropertyReservations,
  deleteMyTrip,
  getMyTrips,
  getMyReservations,
} = require("../controller/reservation");

router
  .route("/")
  .get(authentication, getMyReservations)
  .post(authentication, createReservation);
router.route("/:propertyId").get(getPropertyReservations);
router
  .route("/trips/:id")
  .get(authentication, getMyTrips)
  .delete(authentication, deleteMyTrip);

module.exports = router;
