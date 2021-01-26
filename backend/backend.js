const express = require('express');
const cors = require('cors');
const http = require('http');
const OpenTok = require('opentok');

const apiKey = process.env.VONAGE_API_KEY;
const secret = process.env.VONAGE_SECRET;

if (!apiKey || !secret) {
	console.error('Please specify API key and secret as environment variable!');
	process.exit();
}

const openTok = new OpenTok(apiKey, secret);
var session = null;

function createSession(request, response) {
	console.log('Create session ...');
	if (session == null) {
		openTok.createSession({ mediaMode: 'routed' }, function (err, newSession) {
			if (err) {
				console.log(err);
				response.status(500);
			} else {
				console.log('Create new session')
				session = newSession;
				response.json(createResponse(session));
			}
		});
	} else {
		response.json(createResponse(session));
	}
}

function createResponse(session) {
	const sessionId = session.sessionId;
	const token = session.generateToken();
	console.log('Session ID', sessionId);
	console.log('Token', token);

	return { sessionId, token };
}

const app = express();
app.use(cors());
app.get('/api/session', createSession);
http.createServer(app).listen(8080);
