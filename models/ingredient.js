const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const IngredientModel = mongoose.model('Ingredient', ingredientSchema);

module.exports = IngredientModel