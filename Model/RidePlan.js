const mongoose = require("mongoose");

const RidePlan = new mongoose.Schema({
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
  time: {
    type: String,
  },

  sourcelong: {
    type: String,
  },
  destinationlong: {
    type: String,
  },
  sourcelet: {
    type: String,
  },
  seat: {
    type: String,
  },
  seatFill: {
    type: String,
  },
  destinationlet: {
    type: String,
  },
  availableSeat: {
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

module.exports = mongoose.model("RidePlan", RidePlan);
