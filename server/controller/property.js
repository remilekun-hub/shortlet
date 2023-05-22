const Property = require("../models/Property");
const Review = require("../models/Review");
const NotFound = require("../errors/notFoundError");

const createProperty = async (req, res) => {
  const newProperty = req.body;
  const property = await Property.create({ ...newProperty });
  property.createdBy.id = req.user.userId;
  property.createdBy.name = req.user.name;
  property.createdBy.img = req.user.image || "";
  property.save();
  res.status(201).json({ property });
};

const getProperties = async (req, res) => {
  const properties = await Property.find({
    "createdBy.id": req.user.userId,
  }).select("_id price images city country");
  res.status(200).json(properties);
};

const getProperty = async (req, res) => {
  const { id: propertyID } = req.params;
  const property = await Property.findById(propertyID);
  if (!property) {
    throw new NotFound(`No property with id ${propertyID}`);
  }
  res.status(200).json(property);
};

const updateProperty = async (req, res) => {
  const newProperty = req.body;
  const { id: propertyID } = req.params;

  const property = await Property.findByIdAndUpdate(
    { _id: propertyID, createdBy: { id: req.user.userId } },
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
  const property = await Property.findByIdAndDelete({
    _id: propertyID,
    "createdBy.id": req.user.userId,
  });
  if (!property) {
    throw new NotFound(`No property with id ${propertyID}`);
  }
  res.status(200).send("property deleted");
};

const createPropertyReview = async (req, res) => {
  const { message } = req.body;
  const { id: propertyID } = req.params;
  const isPropertyExist = await Property.findById(propertyID);

  if (!isPropertyExist) {
    throw new NotFound(`no property with id ${propertyID}`);
  }

  await Property.findByIdAndUpdate(
    propertyID,
    {
      $push: {
        reviews: {
          message,
          name: req.user.name,
          image: req.user.image,
          createdBy: req.user.userId,
          propertyId: propertyID,
        },
      },
    },
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
    { new: true, runValidators: true }
  );
  res.status(200).send("review deleted");
};

module.exports = {
  createProperty,
  getProperty,
  getProperties,
  updateProperty,
  deleteProperty,
  createPropertyReview,
  deletePropertyReview,
};
