const express = require('express');
const cors = require('cors');
const http = require('http');
const {createSession} = require('./video');
const {requestCode, checkCode} = require('./2fa');

function logRequest(request, response, next) {
    console.debug('REQUEST', request);
    next();
}

const app = express();
app.use(cors());
// app.use(logRequest);
app.get('/api/video/session', createSession);
app.get('/api/2fa/code', requestCode);
app.get('/api/2fa/check', checkCode); // example: /api/2fa/check?code=1234&request_id=1234567890
http.createServer(app).listen(8080);
