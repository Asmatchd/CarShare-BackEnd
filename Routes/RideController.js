const router = require("express").Router();
const mongoose = require("mongoose");

const Ride = mongoose.model("Ride");
const RidePlan = mongoose.model("RidePlan");
const Driver = mongoose.model("Driver");
const Rider = mongoose.model("Rider");

//Get PM record
router.get("/", async (req, res) => {
  try {
    const pm = await Ride.find();
    res.send(pm);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

//Get by id
router.get("/:rideId", async (req, res) => {
  try {
    const pm = await Ride.findOne({ _id: req.params.rideId });
    res.send(pm);
  } catch (error) {
    res.status(500);
  }
});

//get for driver
router.get("/driver/:driverId", async (req, res) => {
  try {
    const pm = await Driver.findOne({ _id: req.params.driverId }).populate(
      "ride"
    );
    res.send(pm);
  } catch (error) {
    res.status(500);
  }
});

//Get by Rider
router.get("/rider/:riderId", async (req, res) => {
  try {
    const pm = await Rider.findOne({ _id: req.params.riderId }).populate(
      "ride"
    );
    res.send(pm);
  } catch (error) {
    res.status(500);
  }
});

//Update PM Record
router.put("/:rideId", async (req, res) => {
  //console.log(req.body);
  try {
    const pm = await Ride.findByIdAndUpdate(
      {
        _id: req.params.rideId,
      },
      req.body,
      {
        new: true,
      }
    );
    res.send(pm);
  } catch (error) {
    res.send(500);
  }
});

//Insert record
router.post("/", async (req, res) => {
  try {
    const rideplan = await RidePlan.findOne({ _id: req.body.ridePlanId });
    let driver = await Driver.findOne({ _id: req.body.driverId });

    const deleterideplan = await RidePlan.findByIdAndRemove({
      _id: req.body.ridePlanId,
    });

    let pm = new Ride();
    pm.pickupLocation = rideplan.pickupLocation;
    pm.dropoffLocation = rideplan.dropoffLocation;
    pm.fare = rideplan.fare;
    pm.date = rideplan.date;
    pm.driverName = driver.name;
    pm.driverPhoneNumber = driver.phoneNumber;
    rideplan.rider.forEach(async (element) => {
      rider = await Rider.findOne({ _id: element });
      rider.ride.push(pm._id);
      await rider.save();
    });
    driver.ride.push(pm._id);
    await pm.save();
    await driver.save();
    res.send(pm);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

//Delete Reocrd:
router.delete("/:rideId", async (req, res) => {
  try {
    const pm = await Ride.findByIdAndRemove({
      _id: req.params.rideId,
    });
    res.send(pm);
  } catch (error) {
    res.send(500);
  }
});

module.exports = router;
