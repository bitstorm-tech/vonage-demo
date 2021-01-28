const OpenTok = require("opentok");
const apiKey = process.env.TOKBOX_API_KEY;
const secret = process.env.TOKBOX_SECRET;

if (!apiKey || !secret) {
    console.error('Please provide TOKBOX_API_KEY and TOKBOX_SECRET as environment variables!');
    process.exit();
}

const openTok = new OpenTok(apiKey, secret);
let session = null;

exports.createSession = function createSession(request, response) {
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
