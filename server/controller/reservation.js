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
  });
  if (!reservation) {
    return res.status(200).json([]);
  }

  const getProperties = async () => {
    let prop = [];
    for (let i = 0; i < reservation.length; i++) {
      const property = await Property.findOne({
        _id: reservation[i].propertyId,
      });
      console.log(property);
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
  console.log(result);
  res.status(200).json(result);
};
module.exports = {
  createReservation,
  getPropertyReservation,
  getMyReservations,
};
