const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    personCount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: 'requested',
        enum: ['requested','accepted','declined','canceled']
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
},
    { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;