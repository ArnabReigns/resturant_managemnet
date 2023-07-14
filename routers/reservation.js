const express = require('express');
const Reservation = require('../models/reservation');
const resrvationRouter = express.Router();

// GET all reservations
resrvationRouter.get('/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

resrvationRouter.get('/reservations/:email', async (req, res) => {

  try {
    const email = req.params.email;
    const reservations = await Reservation.find({email:email});
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new reservation
resrvationRouter.post('/reservation', async (req, res) => {
  try {
    const { personCount, date, time ,name,email} = req.body;
    const reservation = new Reservation({
      personCount,
      date,
      time,
      name,
      email
    });
    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ error: 'Invalid reservation data' });
  }
});



// DELETE a reservation
resrvationRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReservation = await Reservation.findByIdAndRemove(id);
    if (deletedReservation) {
      res.status(200).json({ message: 'Reservation deleted successfully' });
    } else {
      res.status(404).json({ error: 'Reservation not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = resrvationRouter;