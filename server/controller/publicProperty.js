const Property = require("../models/Property");

const getProperties = async (req, res) => {
  const { country, bath, category, minPrice, maxPrice, guests, bedroom } =
    req.query;
  const propertyQuery = {};

  if (bedroom) {
    propertyQuery.bedroom = { $gte: bedroom };
  }
  if (country) {
    propertyQuery.country = { $regex: country, $options: "i" };
  }
  if (category) {
    propertyQuery.category = { $regex: category, $options: "i" };
  }
  if (bath) {
    propertyQuery.bathrooms = { $gte: bath };
  }
  if (guests) {
    propertyQuery.guests = { $gte: guests };
  }
  if (minPrice) {
    propertyQuery.price = { $gte: minPrice };
  }
  if (maxPrice) {
    propertyQuery.price = { $lte: maxPrice };
  }
  if (minPrice && maxPrice) {
    propertyQuery.price = { $gte: minPrice, $lte: maxPrice };
  }

  console.log({ propertyQuery });
  let result = Property.find(propertyQuery);
  const properties = await result;
  res.status(200).json(properties);
};

const getProperty = async (req, res) => {
  const { id: propertyID } = req.params;
  const property = await Property.findById(propertyID);
  if (!property) {
    throw new NotFound(`No property with id ${propertyID}`);
  }
  res.status(200).json({ property });
};

module.exports = {
  getProperties,
  getProperty,
};
