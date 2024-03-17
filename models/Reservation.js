const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const ReservationSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  tableId: {
    type: Number,
    required: true,
  },
  guestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guest",
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  numberOfGuests: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Confirmed", "Pending", "Cancelled"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Reservation", ReservationSchema);
