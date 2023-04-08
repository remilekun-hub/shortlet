const Property = require("../models/Property");
const Review = require("../models/Review");
const NotFound = require("../errors/notFoundError");

const createProperty = async (req, res) => {
  const newProperty = req.body;
  const property = await Property.create({ ...newProperty });
  res.status(201).json({ property });
};

const getProperties = async (req, res) => {
  const { country, bathroom } = req.query;
  const propertyQuery = {};

  if (country) {
    propertyQuery.country = country;
  }
  if (bathroom) {
    propertyQuery.bath = bathroom;
  }
  const properties = await Property.find(propertyQuery);
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

const updateProperty = async (req, res) => {
  const newProperty = req.body;
  const { id: propertyID } = req.params;

  const property = await Property.findByIdAndUpdate(
    propertyID,
    { ...newProperty },
    { new: true, runValidators: true }
  );
  if (!property) {
    throw new NotFound(`No property with id ${propertyID}`);
  }
  res.status(200).send("property deleted");
};

const deleteProperty = async (req, res) => {
  const { id: propertyID } = req.params;
  const property = await Property.findByIdAndDelete(propertyID);
  if (!property) {
    throw new NotFound(`No property with id ${propertyID}`);
  }
  res.status(200).send("property deleted");
};

const createPropertyReview = async (req, res) => {
  const { message, name } = req.body;
  const { id: propertyID } = req.params;
  const isPropertyExist = await Property.findById(propertyID);

  if (!isPropertyExist) {
    throw new NotFound(`no property with id ${propertyID}`);
  }

  const review = await Review.create({ message, name });
  await Property.findByIdAndUpdate(
    propertyID,
    { $push: { reviews: review } },
    { new: true, runValidators: true }
  );

  res.status(201).send("review created");
};

const deletePropertyReview = async (req, res) => {
  const { id: propertyID, reviewID } = req.params;

  const isPropertyExist = await Property.findById(propertyID);
  if (!isPropertyExist) {
    throw new NotFound(`no property with id ${propertyID}`);
  }
  await Property.findByIdAndUpdate(
    propertyID,
    {
      $pull: { reviews: { _id: reviewID } },
    },
    { new: true }
  );

  const deletedReview = await Review.findByIdAndDelete(reviewID);
  if (!deletedReview) {
    throw new NotFound(`no review with id ${reviewID}`);
  }
  res.status(200).send("review deleted");
};

module.exports = {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty,
  createPropertyReview,
  deletePropertyReview,
};
