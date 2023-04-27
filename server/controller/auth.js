const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/badrequest-error");
const UnAuthenticatedError = require("../errors/unAuthError");

const registerUser = async (req, res) => {
  const { name, email, password, image } = req.body;

  const isEmailExist = await User.findOne({ email });

  if (isEmailExist) {
    throw new BadRequestError("email is already taken");
  }

  await User.create({ name, email, password, image });

  res.status(StatusCodes.CREATED).json({ msg: "user successfully created" });
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
    id: user._id,
    image: user.image,
    token,
  });
};

module.exports = { registerUser, loginUser };
