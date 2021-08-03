const router = require("express").Router();
const mongoose = require("mongoose");

const Rider = mongoose.model("Rider");
const RidePlan = mongoose.model("RidePlan");

//Get PM record
router.get("/", async (req, res) => {
  try {
    const pm = await Rider.find();
    res.send(pm);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

//get rideplan Rider
router.get("/rideplan/:rideId", async (req, res) => {
  console.log("running");
  try {
    const pm = await RidePlan.findOne({ _id: req.params.rideId }).populate(
      "rider"
    );
    res.send(pm);
  } catch (error) {
    res.status(500);
  }
});

//Get by id
router.get("/:riderId", async (req, res) => {
  try {
    const pm = await Rider.findOne({ _id: req.params.riderId });
    res.send(pm);
  } catch (error) {
    res.status(500);
  }
});

//Block Rider or Unblock
router.put("/block", async (req, res) => {
  try {
    const block = await Rider.update(
      { _id: req.body.id },
      {
        $set: {
          status: req.body.status,
        },
      }
    );
    const pm = await Rider.findOne({ _id: req.body.id });
    res.send(pm);
  } catch (error) {
    res.status(500);
  }
});

//Update PM Record
router.put("/:riderId", async (req, res) => {
  //console.log(req.body);
  try {
    const pm = await Rider.findByIdAndUpdate(
      {
        _id: req.params.riderId,
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
  let user = await Rider.findOne({ phoneNumber: req.body.phoneNumber });
  if (user) return res.status(400).send("already exist");
  try {
    let pm = new Rider();
    pm.name = req.body.name;
    pm.email = req.body.email;
    pm.status = "allow";
    pm.password = req.body.password;
    pm.phoneNumber = req.body.phoneNumber;
    pm.address = req.body.address;
    await pm.save();
    res.send(pm);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

//Delete Reocrd:
router.delete("/:riderId", async (req, res) => {
  try {
    const pm = await Rider.findByIdAndRemove({
      _id: req.params.riderId,
    });
    res.send(pm);
  } catch (error) {
    res.send(500);
  }
});

module.exports = router;
