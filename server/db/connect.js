const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.set("strictQuery", true).connect(url);
};

module.exports = connectDB;
