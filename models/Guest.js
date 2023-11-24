const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  dob: Date,
  token: String,
});

module.exports = mongoose.model("Guest", GuestSchema);
