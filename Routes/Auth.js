const router = require("express").Router();
const mongoose = require("mongoose");

const Driver = mongoose.model("Driver");
const Rider = mongoose.model("Rider");
const Admin = mongoose.model("Admin");

router.post("/admin", async (req, res) => {
  let user = await Admin.findOne({
    $and: [{ email: req.body.email }, { password: req.body.password }],
  });
  console.log(user);
  if (!user) return res.status(400).send("Invalid email or password.");
  res.send(user);
});

router.post("/rider", async (req, res) => {
  let user = await Rider.findOne({
    $and: [
      { phoneNumber: req.body.phoneNumber },
      { password: req.body.password },
      { status: "allow" },
    ],
  });
  if (!user) return res.status(400).send("Invalid email or password.");
  res.send(user);
});

router.post("/driver", async (req, res) => {
  let user = await Driver.findOne({
    $and: [
      { phoneNumber: req.body.phoneNumber },
      { password: req.body.password },
      { status: "allow" },
    ],
  });
  if (!user) return res.status(400).send("Invalid email or password.");
  res.send(user);
});

module.exports = router;
