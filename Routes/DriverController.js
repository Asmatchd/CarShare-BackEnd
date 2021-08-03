const router = require("express").Router();
const mongoose = require("mongoose");

const Driver = mongoose.model("Driver");

//Get PM record
router.get("/", async (req, res) => {
  try {
    const pm = await Driver.find();
    res.send(pm);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

//Get by id
router.get("/:driverId", async (req, res) => {
  try {
    const pm = await Driver.findOne({ _id: req.params.driverId });
    res.send(pm);
  } catch (error) {
    res.status(500);
  }
});
//Block Rider or Unblock
router.put("/block", async (req, res) => {
  try {
    const block = await Driver.update(
      { _id: req.body.id },
      {
        $set: {
          status: req.body.status,
        },
      }
    );
    const pm = await Driver.findOne({ _id: req.body.id });
    res.send(pm);
  } catch (error) {
    res.status(500);
  }
});

//Update PM Record
router.put("/:driverId", async (req, res) => {
  //console.log(req.body);
  try {
    const pm = await Driver.findByIdAndUpdate(
      {
        _id: req.params.driverId,
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
  let user = await Driver.findOne({ phoneNumber: req.body.phoneNumber });
  if (user) return res.status(400).send("already exist");
  try {
    let pm = new Driver();
    pm.name = req.body.name;
    pm.email = req.body.email;
    pm.password = req.body.password;
    pm.phoneNumber = req.body.phoneNumber;
    pm.address = req.body.address;
    pm.IDcard = req.body.IDcard;
    pm.license = req.body.license;
    pm.carModel = req.body.license;
    pm.carName = req.body.carName;
    pm.status = "allow";

    await pm.save();
    res.send(pm);
  } catch (error) {
    res.status(500);
  }
});

//Delete Reocrd:
router.delete("/:driverId", async (req, res) => {
  try {
    const pm = await Driver.findByIdAndRemove({
      _id: req.params.driverId,
    });
    res.send(pm);
  } catch (error) {
    res.send(500);
  }
});

module.exports = router;
