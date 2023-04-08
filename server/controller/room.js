const { StatusCodes } = require("http-status-codes");
const Room = require("../models/Room");
const Hotel = require("../models/Hotel");
const NotFoundError = require("../errors/notFoundError");

const createRoom = async (req, res) => {
  const { id: hotelID } = req.params;
  const newRoom = await Room.create(req.body);

  if (!newRoom) throw new Error("room not created");
  const updatedRoom = await Hotel.findByIdAndUpdate(
    hotelID,
    {
      $push: { rooms: newRoom._id },
    },
    { new: true, runValidators: true }
  );
  res.status(201).json({ updatedRoom });
};

const getAllRooms = async (req, res) => {
  const rooms = await Room.find({});

  res.status(StatusCodes.OK).json({ rooms });
};

const getSingleRoom = async (req, res) => {
  // const { id: hotelID } = req.params;

  const room = await Room.findById(req.params.roomID);

  if (!room) {
    throw new NotFoundError(`No room with ID ${req.params.roomID}`);
  }

  res.status(StatusCodes.OK).json({ room });
};

const updateRoom = async (req, res) => {
  // const { id: hotelID } = req.params;
  const room = await Room.findByIdAndUpdate(req.params.roomID, req.body, {
    new: true,
    runValidators: true,
  });

  if (!room) {
    throw new NotFoundError(`No room with ID ${req.params.roomID}`);
  }
  res.status(StatusCodes.OK).send("Room updated");
};

const deleteRoom = async (req, res) => {
  const room = await Room.findByIdAndDelete(req.params.roomID);
  if (!room) {
    throw new NotFoundError(`No room with ID ${req.params.roomID}`);
  }
  const updatedHotel = await Hotel.findByIdAndUpdate(req.params.hotelID, {
    $pull: { rooms: req.params.roomID },
  });

  if (!updatedHotel) {
    throw new NotFoundError(`No hotel with ID ${req.params.hotelID}`);
  }

  res.status(StatusCodes.OK).send(`room with ID ${req.params.roomID} deleted`);
};

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getSingleRoom,
  getAllRooms,
};
