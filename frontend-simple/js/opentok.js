async function getSessionIdAndToken() {
	const response = await fetch('http://localhost:8080/api/session');
	const json = await response.json();
	const sessionId = json.sessionId;
	const token = json.token;

	return { sessionId, token };
}

function handleError(error) {
	if (error) {
		console.error('Something went wrong', error);
	}
}

function initOpenTok(sessionIdAndToken) {
	console.log(sessionIdAndToken)
	const sessionId = sessionIdAndToken.sessionId;
	const token = sessionIdAndToken.token;
	const session = OT.initSession('47097024', sessionId);

	const publisher = OT.initPublisher('publisher', {
		insertMode: 'append',
		width: '800px',
		height: '800px'
	}, handleError);

	session.connect(token, function (error) {
		if (error) {
			handleError(error);
		} else {
			session.publish(publisher, handleError);
		}
	});

	session.on('streamCreated', function (event) {
		session.subscribe(event.stream, 'subscriber', {
			insertMode: 'append',
			width: '300px',
			height: '300px'
		}, handleError);
	});
}

getSessionIdAndToken().then(initOpenTok);
