const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: String,
    unique: true,
  },
  token: {
    access: String,
    refresh: String,
  },
});

module.exports = mongoose.model("Guest", GuestSchema);
