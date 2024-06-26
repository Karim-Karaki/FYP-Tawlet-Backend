const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const RestaurantSchema = new mongoose.Schema({
  portalUsername: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  sortieType: {
    type: String,
    required: false,
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
    type: String,
    required: false,
  },
  layout: {
    type: String,
    required: false,
  },
  images: {
    type: [String],
    required: false,
  },
});

const saltRounds = 10;

RestaurantSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
