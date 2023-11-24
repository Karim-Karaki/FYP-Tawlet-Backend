const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema({
  seatingCapacity: {
    type: Number,
    required: true,
  },
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

module.exports = mongoose.model("Table", TableSchema);
