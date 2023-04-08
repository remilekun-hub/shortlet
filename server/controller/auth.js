const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/badrequest-error");
const UnAuthenticatedError = require("../errors/unAuthError");

const registerUser = async (req, res) => {
  const newUser = req.body;

  const user = await User.create({ ...newUser });

  res.status(StatusCodes.CREATED).json(user);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.user);

  if (!email || !password) {
    throw new BadRequestError("please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    throw new UnAuthenticatedError("password is incorrect");
  }
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    name: user.name,
    isAdmin: user.isAdmin,
    token,
  });
};

module.exports = { registerUser, loginUser };
