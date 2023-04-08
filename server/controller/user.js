const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const NotFoundError = require("../errors/notFoundError");

const getAllUsers = async (req, res) => {
  if (req.user.isAdmin) {
    const users = await User.find({});
    res.status(StatusCodes.OK).json({ users });
  } else {
    throw new ForbiddenError("you are not allowed access to this route");
  }
};

const getSingleUser = async (req, res) => {
  const { id: userID } = req.params;

  const user = await User.findById(userID);

  if (!user) {
    throw new NotFoundError(`No user with ID ${userID}`);
  }

  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const { id: userID } = req.params;
  const user = await User.findByIdAndUpdate(userID, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new NotFoundError(`No user with ID ${userID}`);
  }
  res.status(StatusCodes.OK).send("user updated");
};

const deleteUser = async (req, res) => {
  const { id: userID } = req.params;

  const user = await User.findByIdAndDelete(userID);

  if (!user) {
    throw new NotFoundError(`No user with ID ${userID}`);
  }

  res.status(StatusCodes.OK).send(`user deleted`);
};

module.exports = {
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
};
