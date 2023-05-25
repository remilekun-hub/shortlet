const express = require("express");
const router = express.Router();
const {
  updateUserFavourite,
  deleteUserfavourite,
} = require("../controller/user");

router.route("/favourites").patch(updateUserFavourite);
router.route("/favourites/:id").delete(deleteUserfavourite);

module.exports = router;
