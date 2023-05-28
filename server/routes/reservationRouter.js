const express = require("express");
const router = express.Router();
const {
  createReservation,
  getPropertyReservation,
  getMyReservations
} = require("../controller/reservation");
const { authentication } = require("../middleware/authentication");

router.route("/").get(authentication, getMyReservations).post(authentication, createReservation);
router.route("/:id").get(getPropertyReservation);

module.exports = router;
