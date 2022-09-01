const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const userAuthRoute = require("./routes/userAuth");
const liveAuthRoute = require("./routes/streamAuth");

dotenv.config();

mongoose.connect(process.env.DB_URL, {
  dbName: process.env.DB,
  user: process.env.DB_USER,
  pass: process.env.DB_PASSWORD,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to DB!");
});

app.use(express.json());

app.use("/api/user", userAuthRoute);
app.use("/api/live", liveAuthRoute);

app.listen(4000, () => console.log("Server up and running"));
