const Reservation = require("../models/Reservation");
const Property = require("../models/Property");

const createReservation = async (req, res) => {
  const newReservation = req.body;

  const reservation = await Reservation.create({
    ...newReservation,
    reservedBy: req.user.userId,
  });

  res.status(201).json({ msg: "reservation created" });
};

const getPropertyReservation = async (req, res) => {
  const { id } = req.params;
  const reservation = await Reservation.find({ propertyId: id });

  res.status(200).json(reservation);
};

const getMyReservations = async (req, res) => {
  const reservation = await Reservation.find({
    propertyOwner: req.user.userId,
  }).sort("-createdAt");

  if (!reservation) {
    return res.status(200).json([]);
  }

  const getProperties = async () => {
    let prop = [];
    for (let i = 0; i < reservation.length; i++) {
      const property = await Property.findOne({
        _id: reservation[i].propertyId,
      });

      const newPropertyDetails = {
        images: property.images,
        startDate: reservation[i].startDate,
        endDate: reservation[i].endDate,
        price: reservation[i].price,
        state: property.state,
        city: property.city,
        country: property.country,
        _id: property._id,
        reservationId: reservation[i]._id,
      };
      prop.push(newPropertyDetails);
    }
    return prop;
  };

  const result = await getProperties();
  res.status(200).json(result);
};

const getMyTrips = async (req, res) => {
  const trips = await Reservation.find({ reservedBy: req.user.userId }).sort(
    "-createdAt"
  );
  if (!trips) {
    return res.status(200).json([]);
  }

  const getProperties = async () => {
    let prop = [];
    for (let i = 0; i < trips.length; i++) {
      const property = await Property.findOne({
        _id: trips[i].propertyId,
      });
      const newPropertyDetails = {
        reservation: trips[i],
        reservationListing: property,
      };
      prop.push(newPropertyDetails);
    }
    return prop;
  };
  const result = await getProperties();
  res.status(200).json(result);
};

const deleteTrip = async (req, res) => {
  const deletedTrip = await Reservation.findOneAndDelete({
    _id: req.params.id,
  });

  if (!deletedTrip) {
    return res
      .status(404)
      .json({ msg: `you have no Trip with id ${req.params.id}` });
  }
  res.status(200).json({ msg: "trip cancelled" });
};
module.exports = {
  createReservation,
  getPropertyReservation,
  getMyReservations,
  getMyTrips,
  deleteTrip,
};
