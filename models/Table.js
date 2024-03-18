const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  seatingCapacity: {
    type: Number,
    required: true,
  },
  tableNumber: {
    type: Number,
    required: true,
  },
  tableType: {
    type: String,
    required: true,
    enum: ["round", "low", "high", "square", "rectangular", "custom", "booth"],
  },
});

module.exports = mongoose.model("Table", TableSchema);
