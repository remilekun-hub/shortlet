const express = require("express");
const router = express.Router();
const { getProperties, getProperty } = require("../controller/publicProperty");

router.route("/").get(getProperties);
router.route("/:id").get(getProperty);

module.exports = router;
