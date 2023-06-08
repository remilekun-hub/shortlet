const Favourites = require("../models/Favourites");
const Property = require("../models/Property");
const User = require("../models/User");

const getFavourites = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    return res.status(200).json([]);
  }

  const Properties = async () => {
    let props = [];
    for (i = 0; i < user.favourites.length; i++) {
      const property = await Property.findOne({
        _id: user.favourites[i].propertyId,
      }).select("-createdBy");
      props.push(property);
    }
    return props;
  };
  const result = await Properties();
  res.status(200).json(result);
};

module.exports = {
  getFavourites,
};
