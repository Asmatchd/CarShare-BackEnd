const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  ride: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride",
    },
  ],
  driver: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
  ],
});

module.exports = mongoose.model("Admin", AdminSchema);
