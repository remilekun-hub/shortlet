const express = require("express");
const router = express.Router();
const { getFavourites } = require("../controller/favourites");

router.route("/").get(getFavourites);

module.exports = router;
