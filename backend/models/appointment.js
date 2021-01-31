const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    requestId: {
        type: String,
    },
    appointmentDate: {
        type: String,
        unique: true,
    },
}, {timestamps: true});

const Appointment = mongoose.model('appointment', appointmentSchema);
module.exports = Appointment;
