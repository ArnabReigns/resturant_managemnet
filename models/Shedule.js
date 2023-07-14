const mongoose = require('mongoose');
const weekDaysEnum = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const shiftEnum = ['day', 'night', 'none'];

const scheduleSchema = new mongoose.Schema({
  staff_name: {
    type: String,
    required: true
  },
  schedule: {
    type: {
      mon: {
        type: String,
        enum: ['day', 'night', 'none']
      },
      tue: {
        type: String,
        enum: ['day', 'night', 'none']
      },
      wed: {
        type: String,
        enum: ['day', 'night', 'none']
      },
      thu: {
        type: String,
        enum: ['day', 'night', 'none']
      },
      fri: {
        type: String,
        enum: ['day', 'night', 'none']
      },
      sat: {
        type: String,
        enum: ['day', 'night', 'none']
      },
      sun: {
        type: String,
        enum: ['day', 'night', 'none']
      }
    },
    default: {
      "mon": "day",
    },
    required: true
  },
}, { timestamps: true });

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;