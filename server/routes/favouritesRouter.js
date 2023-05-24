const express = require("express");
const router = express.Router();
const {
  createFavourite,
  getFavourites,
  deleteFavourite,
  getFavourite,
} = require("../controller/favourites");

router.route("/").get(getFavourites).post(createFavourite);
router.route("/:id").delete(deleteFavourite);

module.exports = router;
