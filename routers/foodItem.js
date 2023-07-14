const express = require('express');
const router = express.Router();
const FoodItem = require('../models/foodItem');
const Ingredient = require('../models/ingredient');

// GET all food items
router.get('/fooditems', async (req, res) => {
  try {
    const foodItems = await FoodItem.find().populate('ingredients.ingredientId', 'name _id quantity');
    res.status(200).json(foodItems);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


// POST a food item
router.post('/fooditems', async (req, res) => { 
  try {
    const { name, ingredients,price } = req.body;


    
    // Check if all ingredient IDs are valid
    const isValidIngredients = await Ingredient.find({ _id: { $in: ingredients.map(i => i.ingredientId) } });
    if (isValidIngredients.length !== ingredients.length) {
      res.status(400).json({ error: 'Invalid ingredient ID(s)' });
      return;
    }
    
    // Check if any ingredient doesn't have enough quantity
    const insufficientIngredients = [];
    for (const item of ingredients) {
      const ingredient = isValidIngredients.find(i => i._id.toString() === item.ingredientId);
      if (ingredient && ingredient.quantity < item.quantity) {
        insufficientIngredients.push(ingredient.name);
      }
    }

    if (insufficientIngredients.length > 0) {
      res.status(400).json({ error: `Insufficient quantity for ingredient(s): ${insufficientIngredients.join(', ')}` });
      return;
    }

    const foodItem = new FoodItem({
      name,
      ingredients,
      price
    });
    await foodItem.save();
    res.status(201).json(foodItem);
  } catch (err) {
    res.status(400).json({ error: 'Invalid food item data' });
  }
});


module.exports = router;
