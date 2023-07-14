const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true
  },
  ingredients: [
    {
      ingredientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;