const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const NotFoundError = require("../errors/notFoundError");

const updateUserFavourite = async (req, res) => {
  const { propertyId } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.userId,
    {
      $push: {
        favourites: { propertyId },
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    throw new NotFoundError(`No user with ID ${req.user.userId}`);
  }
  res.status(StatusCodes.OK).send(user);
};

const deleteUserfavourite = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(
    req.user.userId,
    {
      $pull: {
        favourites: { propertyId: id },
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!user) {
    throw new NotFoundError(
      `No user with ID ${req.user.userId} or property with ID ${id}`
    );
  }
  res.status(StatusCodes.OK).send(user);
};
module.exports = {
  updateUserFavourite,
  deleteUserfavourite,
};
