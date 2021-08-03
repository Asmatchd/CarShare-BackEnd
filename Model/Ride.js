const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema({
  pickupLocation: {
    type: String,
  },
  dropoffLocation: {
    type: String,
  },
  fare: {
    type: String,
  },
  date: {
    type: String,
  },
  driverName: {
    type: String,
  },
  driverPhoneNumber: {
    type: String,
  },
  riderName: {
    type: String,
  },
  riderPhoneNumber: {
    type: String,
  },

  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
  },
  rider: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rider",
    },
  ],
});

module.exports = mongoose.model("Ride", RideSchema);
