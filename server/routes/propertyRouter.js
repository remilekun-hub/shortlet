const express = require("express");
const router = express.Router();
const {
  createProperty,
  getProperty,
  deleteProperty,
  updateProperty,
  createPropertyReview,
  deletePropertyReview,
} = require("../controller/property");

router.route("/").post(createProperty);

router
  .route("/:id")
  .get(getProperty)
  .patch(updateProperty)
  .delete(deleteProperty);

router.route("/:id/review").post(createPropertyReview);
router.route("/:id/review/:reviewID").delete(deletePropertyReview);

module.exports = router;
