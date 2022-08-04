// Merch orders
const mongoose = require('mongoose');

// Order model for future use
const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  merch: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Merch'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
