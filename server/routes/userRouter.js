const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controller/user");
const { verifyUser } = require("../middleware/authentication");

router.route("/").get(getAllUsers);
router
  .route("/:id")
  .get(verifyUser, getSingleUser)
  .patch(verifyUser, updateUser)
  .delete(verifyUser, deleteUser);

module.exports = router;
