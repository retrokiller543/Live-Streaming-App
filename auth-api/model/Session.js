const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  SESSID: {
    type: String,
    required: true,
    min: 4,
    max: 64,
  },
  username: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Session", sessionSchema);
