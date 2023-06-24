const Reservation = require("../models/Reservation");
const Property = require("../models/Property");

const createReservation = async (req, res) => {
  const newReservation = req.body;

  await Reservation.create({
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

const deleteReservation = async (req, res) => {
  const deletedReservation = await Reservation.findOneAndDelete({
    _id: req.params.id,
    propertyOwner: req.user.userId,
  });
  if (!deletedReservation) {
    return res
      .status(404)
      .json({ msg: `you have no reservation with id ${req.params.id}` });
  }
  res.status(200).send("reservation deleted");
};

const getMyReservations = async (req, res) => {
  const reservation = Reservation.find({
    propertyOwner: req.user.userId,
  });
  const sortedReservation = await reservation.sort("-createdAt");

  if (!sortedReservation) {
    return res.status(200).json([]);
  }

  const getProperties = async () => {
    let prop = [];
    for (let i = 0; i < sortedReservation.length; i++) {
      const property = await Property.findOne({
        _id: sortedReservation[i].propertyId,
      });

      const newPropertyDetails = {
        reservation: sortedReservation[i],
        reservationListing: property,
      };
      prop.push(newPropertyDetails);
    }
    return prop;
  };

  const result = await getProperties();
  res.status(200).json(result);
};

const getMyTrips = async (req, res) => {
  const trips = Reservation.find({ reservedBy: req.user.userId });
  const sortedTrips = await trips.sort("-createdAt");

  if (!sortedTrips) {
    return res.status(404).json([]);
  }

  const getProperties = async () => {
    let prop = [];
    for (let i = 0; i < sortedTrips.length; i++) {
      const property = await Property.findOne({
        _id: sortedTrips[i].propertyId,
      });
      const newPropertyDetails = {
        reservation: sortedTrips[i],
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
  deleteReservation,
  getMyTrips,
  deleteTrip,
};
