const express = require('express');
const router = express.Router();
const Schedule = require('../models/Shedule');

// GET all schedules
router.get('/schedules', async (req, res) => {
  try {
    const schedules = await Schedule.find({}," -schedule._id");
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new schedule
router.post('/schedules', async (req, res) => {

  try {
    const { staff_name, schedule } = req.body;
    console.log(staff_name, schedule)

    const newSchedule = new Schedule({ staff_name, schedule })
    await newSchedule.save();
    res.status(201).json(newSchedule);
  }
  catch (e) {
    res.status(500).json({ error: e });
  }
});


// UPDATE a schedule by staff ID
router.put('/schedules/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { schedule } = req.body;

    const updatedSchedule = await Schedule.findOneAndUpdate(
      { staff_id: id },
      { schedule },
      { new: true }
    );

    if (!updatedSchedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    res.json(updatedSchedule);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

module.exports = router;
