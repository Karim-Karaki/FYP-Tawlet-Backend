const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema({
  seatingCapacity: {
    type: Number,
    required: true,
  },
  reservations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
    },
  ],
  tableType: {
    type: String,
    required: true,
    enum: ["round", "low", "high", "square", "rectangular", "custom", "booth"],
  },
  isReserved: {
    type: Boolean,
    default: false,
  },
});

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  diet: [String],
  imageURL: String,
  feedsHowMany: {
    type: String,
    required: true,
  },
});

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  cuisine: {
    type: [String],
    required: true,
  },
  openingHours: {
    type: String,
    required: true,
  },
  menu: {
    type: [{ item: menuItemSchema }],
    ref: "Menu",
  },
  layout: {
    type: [
      {
        table: TableSchema,
        x: Number,
        y: Number,
      },
    ],
    required: false,
  },
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
