const Property = require("../models/Property");

const getProperties = async (req, res) => {
  const {
    country,
    baths,
    beds,
    category,
    minPrice,
    maxPrice,
    guests,
    bedrooms,
  } = req.query;
  const propertyQuery = {};

  if (beds) {
    propertyQuery.bed = { $gte: beds };
  }
  if (bedrooms) {
    propertyQuery.bedrooms = { $gte: bedrooms };
  }
  if (country != "null") {
    propertyQuery.country = { $regex: country, $options: "i" };
  }
  if (category != "null") {
    propertyQuery.category = { $regex: category, $options: "i" };
  }
  if (baths) {
    propertyQuery.bathrooms = { $gte: baths };
  }
  if (guests) {
    propertyQuery.guests = { $gte: guests };
  }
  if (minPrice) {
    propertyQuery.price = { $gte: minPrice };
  }
  if (maxPrice) {
    propertyQuery.price = { $lte: minPrice };
  }
  if (minPrice && maxPrice) {
    propertyQuery.price = { $gte: minPrice, $lte: maxPrice };
  }

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
