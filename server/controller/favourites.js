const Favourites = require("../models/Favourites");
const Property = require("../models/Property");

const createFavourite = async (req, res) => {
  const newFav = req.body;
  const user = req.user.userId;
  await Favourites.create({ ...newFav, createdBy: user });
  res.status(200).send("added to favourites");
};

const getFavourites = async (req, res) => {
  const user = req.user.userId;
  const fav = await Favourites.find({ createdBy: user });
  if (!fav) {
    return res.status(200).json([]);
  }

  const Properties = async (req, res) => {
    let props = [];
    for (i = 0; i < fav.length; i++) {
      const property = await Property.find({ _id: fav[i].propertyId });
      props.push(property);
    }
    return props;
  };
  const result = await Properties();
  res.status(200).json(result);
};

const getFavourite = async (req, res) => {
  const user = req.user.userId;
  const { id } = req.params;
  const fav = await Favourites.find({ createdBy: user, propertyId: id });

  res.status(200).json(fav);
};

const deleteFavourite = async (req, res) => {
  const user = req.user.userId;
  const { id } = req.params;
  await Favourites.findOneAndDelete({
    createdBy: user,
    propertyId: id,
  });

  res.status(200).send("property removed from favourites");
};
module.exports = {
  createFavourite,
  getFavourites,
  getFavourite,
  deleteFavourite,
};
