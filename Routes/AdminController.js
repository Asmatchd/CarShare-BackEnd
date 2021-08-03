const router = require("express").Router();
const mongoose = require("mongoose");

const Admin = mongoose.model("Admin");

//Get PM record
router.get("/", async (req, res) => {
  try {
    const pm = await Admin.find();
    res.send(pm);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

//Get by id
router.get("/:adminId", async (req, res) => {
  try {
    const pm = await Admin.findOne({ _id: req.params.adminId });
    res.send(pm);
  } catch (error) {
    res.status(500);
  }
});

//Update PM Record
router.put("/:adminId", async (req, res) => {
  //console.log(req.body);
  try {
    const pm = await Admin.findByIdAndUpdate(
      {
        _id: req.params.adminId,
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
  console.log(req.body);
  try {
    let pm = new Admin();
    pm.name = req.body.name;
    pm.email = req.body.email;
    pm.password = req.body.password;
    await pm.save();
    res.send(pm);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

//Delete Reocrd:
router.delete("/:adminId", async (req, res) => {
  try {
    const pm = await Admin.findByIdAndRemove({
      _id: req.params.adminId,
    });
    res.send(pm);
  } catch (error) {
    res.send(500);
  }
});

module.exports = router;
