const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

const routes = require("./routes/index");

//database
mongoose
  .connect("mongodb://localhost/crud-mongo")
  .then((db) => {
    console.log("Connect");
  })
  .catch((err) => {
    console.log("Error");
  });

//settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//middewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/", routes);

//listeners
app.listen(app.get("port"), () => {
  console.log("Port: " + app.get("port"));
});
