const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  tableNo: {
    type: String,
    required: true,
  },
  items: [
    {
      foodItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodItem',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default:1
      },
    },
  ],
  status: {
    type: String,
    enum: ['preparing', 'ready to serve', 'served'],
    default: 'preparing',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;