const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const FoodItem = require('../models/foodItem');


// GET all orders
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST a new order
router.post('/orders', async (req, res) => {
    try {
        const { tableNo, items } = req.body;

        // Check if all food item IDs are valid
        const foodItemIds = items.map(item => item.foodItemId);

        console.log(foodItemIds)
        const isValidFoodItems = await FoodItem.find({ _id: { $in: foodItemIds } });

        const orderItems = [];
        for (const item of items) {
            const foodItem = isValidFoodItems.find(fi => fi._id.toString() === item.foodItemId);
            if (!foodItem) {
                res.status(400).json({ error: `Food item not found: ${item.foodItemId}` });
                return;
            }
            orderItems.push({
                foodItemId: foodItem._id,
                quantity: item.quantity,
            });
        }

        const order = new Order({
            tableNo,
            items: orderItems,
            status: 'preparing',
        });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

// GET unserved orders
router.get('/orders/unserved', async (req, res) => {
    try {
        const unservedOrders = await Order.find({ status: { $ne: 'served' } });
        res.status(200).json(unservedOrders);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT/update the status of an order
router.put('/orders/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Check if the provided status is valid
        const validStatuses = ['preparing', 'ready to serve', 'served'];
        if (!validStatuses.includes(status)) {
            res.status(400).json({ error: 'Invalid status' });
            return;
        }

        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
        if (updatedOrder) {
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;