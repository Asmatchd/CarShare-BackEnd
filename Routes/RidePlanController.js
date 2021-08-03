const router = require("express").Router();
const mongoose = require("mongoose");

const RidePlan = mongoose.model("RidePlan");
const Driver = mongoose.model("Driver");
const Rider = mongoose.model("Rider");

//Get PM record
router.get("/", async (req, res) => {
  try {
    const pm = await RidePlan.find();
    res.send(pm);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

//Get by Driver
router.get("/:driverId", async (req, res) => {
  try {
    const pm = await Driver.findOne({ _id: req.params.driverId }).populate(
      "ridePlan"
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
      "ridePlan"
    );
    res.send(pm);
  } catch (error) {
    res.status(500);
  }
});
//Get by Driver
router.post("/search", async (req, res) => {
  console.log(req.body);
  let rides = await RidePlan.find({
    $and: [
      { pickupLocation: req.body.pickupLocation },
      { dropoffLocation: req.body.dropoffLocation },
      { date: req.body.date },
      { availableSeat: { $gte: req.body.seat } },
    ],
  });
  if (!rides) return res.status(400).send("no ride yet available");
  else {
    console.log(rides);
    res.send(rides);
  }
});

//cancel rideplan rider
router.post("/cancel", async (req, res) => {
  console.log(req.body);
  let newRider = []; // for ride plan
  let newRide = []; // for rider
  try {
    const rider = await Rider.findOne({ _id: req.body.riderId });
    const rideplan = await RidePlan.findOne({ _id: req.body.ridePlanId });

    rider.ridePlan.forEach((element) => {
      if (element != req.body.ridePlanId) newRide.push(element);
    });

    rideplan.rider.forEach((element) => {
      if (element != req.body.riderId) newRider.push(element);
    });

    const cancelRide = await RidePlan.update(
      { _id: rideplan._id },
      {
        $set: {
          rider: newRider,
        },
      }
    );

    const cancelRider = await Rider.update(
      { _id: rider._id },
      {
        $set: {
          ridePlan: newRide,
        },
      }
    );
    await rider.save();
    await rideplan.save();
    res.send(rider);
  } catch (error) {
    res.status(500);
  }
});

//Booked Ride
router.post("/booked", async (req, res) => {
  let ride = await RidePlan.findOne({
    $and: [
      { pickupLocation: req.body.pickupLocation },
      { dropoffLocation: req.body.dropoffLocation },
      { date: req.body.date },
      { rider: req.body.riderId },
    ],
  });
  if (ride) return res.status(400).send("already exist");
  try {
    const rider = await Rider.findOne({ _id: req.body.riderId });
    const rideplan = await RidePlan.findOne({ _id: req.body.ridePlanId });

    rideplan.rider.push(req.body.riderId);
    rider.ridePlan.push(rideplan._id);

    let newseats = rideplan.availableSeat - req.body.seat;

    const ridebooked = await RidePlan.update(
      { _id: rideplan._id },
      {
        $set: {
          availableSeat: newseats,
        },
      }
    );

    await rider.save();
    await rideplan.save();
    res.send(rideplan);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
});

//Get by id
router.get("/ridePlanId", async (req, res) => {
  try {
    const pm = await RidePlan.findOne({ _id: req.params.ridePlanId });
    res.send(pm);
  } catch (error) {
    res.status(500);
  }
});

//Update PM Record
router.put("/:ridePlanId", async (req, res) => {
  //console.log(req.body);
  try {
    const pm = await RidePlan.findByIdAndUpdate(
      {
        _id: req.params.ridePlanId,
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
  let ride = await RidePlan.findOne({
    $and: [
      { pickupLocation: req.body.pickupLocation },
      { dropoffLocation: req.body.dropoffLocation },
      { date: req.body.date },
      { driver: req.body.driver },
    ],
  });
  if (ride) return res.status(400).send("already exist");

  try {
    let pm = new RidePlan();
    //creation
    let driver = await Driver.findOne({ _id: req.body.driver });
    pm.pickupLocation = req.body.pickupLocation;
    pm.dropoffLocation = req.body.dropoffLocation;
    pm.fare = req.body.fare;
    pm.date = req.body.date;
    pm.time = req.body.time;
    pm.sourcelong = req.body.sourcelong;
    pm.destinationlong = req.body.destinationlong;
    pm.sourcelet = req.body.sourcelet;
    pm.destinationlet = req.body.destinationlet;
    pm.availableSeat = req.body.seat;
    pm.seatFill = "no";

    //assocaition
    pm.driver = driver._id;
    driver.ridePlan.push(pm._id);
    //save
    await driver.save();
    await pm.save();
    res.send(pm);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

//Delete Reocrd:
router.delete("/:ridePlanId", async (req, res) => {
  let ridePlan = await RidePlan.findOne({
    _id: req.params.ridePlanId,
  });
  if (ridePlan.rider != "") return res.status(400).send("cannot delete");
  try {
    const pm = await RidePlan.findByIdAndRemove({
      _id: req.params.ridePlanId,
    });
    res.send(pm);
  } catch (error) {
    res.send(500);
  }
});

module.exports = router;
