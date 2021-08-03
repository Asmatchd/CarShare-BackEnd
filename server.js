const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");

//const morgan = require("morgan")

//database connection
require("./configration/dbconnection");

//Middleware
app.use(cors());
app.use(bodyParser.json());
//app.use(morgan());

//Models
require("./Model/Rider");
require("./Model/Admin");
require("./Model/Driver");
require("./Model/Ride");
require("./Model/RidePlan");

//Routes
app.use("/rider", require("./Routes/RiderController"));
app.use("/admin", require("./Routes/AdminController"));
app.use("/driver", require("./Routes/DriverController"));
app.use("/rideplan", require("./Routes/RidePlanController"));
app.use("/ride", require("./Routes/RideController"));
app.use("/auth", require("./Routes/Auth"));

//listening port
app.listen(4000, () => {
  console.log("Listening on 4000");
});
