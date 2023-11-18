const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem'
  }]
});

module.exports = mongoose.model('Menu', MenuSchema);
