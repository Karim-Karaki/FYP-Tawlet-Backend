const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: true,
  },
  guestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guest",
    required: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  date: {
    type: String, //Format: "YYYY-MM-DD"
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
    //enum for fized time slots with 2 hour increments from 8 am to 10 pm
    enum: [
      "8:00 AM",
      "10:00 AM",
      "12:00 PM",
      "2:00 PM",
      "4:00 PM",
      "6:00 PM",
      "8:00 PM",
      "10:00 PM",
    ],
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
