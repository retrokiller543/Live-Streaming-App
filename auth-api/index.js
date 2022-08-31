const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, () => console.log("Connected to db!"));

app.use(express.json());

app.use("/api/user", authRoute);

app.listen(4000, () => console.log("Server up and running"));
