const express = require('express');
const cors = require('cors');
const http = require('http');
const {createSession} = require('./video');
const {requestCode, checkCode} = require('./2fa');
const mongoose = require('mongoose');
const {insight} = require('./insight');

const app = express();
app.use(cors());
app.get('/api/video/session', createSession);
app.get('/api/2fa/code', requestCode); // example: /api/2fa/code?phone_number=491761234567890
app.get('/api/2fa/check', checkCode); // example: /api/2fa/check?code=1234&request_id=1234567890
app.get('/api/insights', insight) // example: /api/insights?phone_number=491761234567890

mongoose.connect('mongodb://localhost:27017/corona_appointment', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to DB -> start listening ...');
        http.createServer(app).listen(8080);
    })
    .catch(error => {
        console.error('Error while connection to DB: ', error);
        process.exit();
    });
