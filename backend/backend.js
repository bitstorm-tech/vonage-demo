const express = require('express');
const cors = require('cors');
const http = require('http');
const {createSession} = require('./video');
const {requestCode} = require('./2fa');
const mongoose = require('mongoose');
const {sendAppointmentDateAsVoiceCall} = require('./voice');
const {updateAppointmentDate, getAppointmentDate} = require('./appointment');
const {insight} = require('./insight');

const app = express();
app.use(cors());
app.use(express.json());
app.get('/api/video/session', createSession);
app.get('/api/2fa/code', requestCode); // example: /api/2fa/code?phone_number=491761234567890
app.get('/api/appointment', getAppointmentDate); // example: /api/appointment?code=1234&phone_number=491761234567890
app.put('/api/appointment/:phoneNumber', updateAppointmentDate); //example: /api/appointment/491761234567890 with appointmentDate in body
app.get('/api/insight', insight); // example: /api/insight?phone_number=491761234567890
app.get('/api/voice/:phoneNumber', sendAppointmentDateAsVoiceCall); // example: /api/voice/491761234567890

mongoose.connect('mongodb://localhost:27017/corona_appointment', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to DB -> start listening ...');
        http.createServer(app).listen(8080);
    })
    .catch(error => {
        console.error('Error while connection to DB: ', error);
        process.exit();
    });
