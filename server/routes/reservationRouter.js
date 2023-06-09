const express = require("express");
const router = express.Router();
const {
  createReservation,
  getPropertyReservation,
  getMyReservations,
  deleteReservation,
  getMyTrips,
  deleteTrip,
} = require("../controller/reservation");
const { authentication } = require("../middleware/authentication");

router
  .route("/")
  .get(authentication, getMyReservations)
  .post(authentication, createReservation);
router.route("/trips").get(authentication, getMyTrips);
router.route("/trips/:id").delete(authentication, deleteTrip);
router
  .route("/:id")
  .get(getPropertyReservation)
  .delete(authentication, deleteReservation);

module.exports = router;
