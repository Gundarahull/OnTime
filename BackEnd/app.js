require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/db");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:5173", // frontend's URL
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the OnTime");
});

//Config Routes
app.use("/users", require("./routes/user.routes"));
app.use("/captain", require("./routes/captain.routes"));

module.exports = app;
