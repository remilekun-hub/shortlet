const Reservation = require("../models/Reservation");
const NotFound = require("../errors/notFoundError");

const createReservation = async (req, res) => {
  const newReservation = req.body;
  const reservation = await Reservation.create({ ...newReservation });

  res.status(201).json(reservation);
};

const getMyReservations = async (req, res) => {
  const userID = req.user.userId;
  const reservations = await Reservation.find({ propertyOwner: userID });
  if (!reservations) {
    return res.status(200).json([]);
  }
  res.status(200).json(reservations);
};

const getMyTrips = async (req, res) => {
  const { id: userID } = req.params;
  const trips = await Reservation.find({ reservedBy: userID });
  if (!trips) {
    throw new NotFound(`no trips reserved by ${userID}`);
  }
  res.status(200).json(trips);
};

const deleteMyTrip = async (req, res) => {
  const { id: reservationID } = req.params;
  const userID = req.user.userId;
  const reservation = await Reservation.findByIdAndDelete({
    _id: reservationID,
    reservedBy: userID,
  });
  if (!reservation) {
    throw new NotFound(`no reservation with id ${reservationID}`);
  }
  res.status(200).send("reservation deleted");
};

module.exports = {
  createReservation,
  getMyReservations,
  getMyTrips,
  deleteMyTrip,
};
