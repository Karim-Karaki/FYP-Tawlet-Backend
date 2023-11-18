const mongoose = require("mongoose");

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
  menuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
  },
  layout: {
    type: [
      [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Table",
        },
      ],
    ],
    required: false,
  },
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
