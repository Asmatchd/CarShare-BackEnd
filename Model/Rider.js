const mongoose = require("mongoose");

const RiderSchema = new mongoose.Schema({
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
  status: {
    type: String,
  },
  ridePlan: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RidePlan",
    },
  ],
  ride: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride",
    },
  ],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
});

module.exports = mongoose.model("Rider", RiderSchema);
