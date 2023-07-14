const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient');

// GET all ingredients
router.get('/ingredients', async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST an ingredient
router.post('/ingredients', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const ingredient = new Ingredient({
      name,
      quantity,
    });
    await ingredient.save();
    res.status(201).json(ingredient);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ingredient data' });
  }
});

// PUT/update an ingredient quantity
router.put('/ingredients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const updatedIngredient = await Ingredient.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );
    if (updatedIngredient) {
      res.status(200).json(updatedIngredient);
    } else {
      res.status(404).json({ error: 'Ingredient not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
