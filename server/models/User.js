const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const FavouriteSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Types.ObjectId,
    ref: "Property",
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "username must be provided"],
  },
  email: {
    type: String,
    // pattern: [],
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  image: {
    type: String,
    required: [true, "your image is required"],
  },
  favourites: [FavouriteSchema],
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatepassword) {
  const isMatch = await bcrypt.compare(candidatepassword, this.password);
  return isMatch;
};

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
      name: this.name,
      image: this.image,
      favourites: this.favourites,
    },
    "remi",
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

module.exports = mongoose.model("User", UserSchema);
