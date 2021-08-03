const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  carModel: {
    type: String,
  },
  carName: {
    type: String,
  },
  IDcard: {
    type: String,
  },
  license: {
    type: String,
  },
  status: {
    type: String,
  },
  ride: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride",
    },
  ],
  ridePlan: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RidePlan",
    },
  ],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
});

module.exports = mongoose.model("Driver", DriverSchema);
