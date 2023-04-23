const Property = require("../models/Property");

const getProperties = async (req, res) => {
  const { country, bathroom } = req.query;
  const propertyQuery = {};

  if (country) {
    propertyQuery.country = country;
  }
  if (bathroom) {
    propertyQuery.bath = bathroom;
  }
  const properties = await Property.find(propertyQuery).select("-createdBy");
  res.status(200).json({ properties, nbHits: properties.length });
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
