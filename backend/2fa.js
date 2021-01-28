const Vonage = require('@vonage/server-sdk');

const apiKey = process.env.NEXMO_API_KEY;
const apiSecret = process.env.NEXMO_SECRET;

if (!apiKey || !apiSecret) {
    console.error('Please provide NEXMO_API_KEY and NEXMO_SECRET as environment variables!');
    process.exit();
}

const vonage = new Vonage({apiKey, apiSecret}, {debug: false});

function processResult(error, result, response) {
    if (error) {
        console.error('Error:', error)
        response.send('Error: ' + error);
    } else {
        console.log('Result:', result)
        response.send('Result: ' + result);
    }
}

exports.requestCode = (request, response) => {
    console.log('Requesting code ...');

    vonage.verify.request({
        number: '4917623577377',
        brand: 'CoronaAppointment',
    }, (error, result) => processResult(error, result, response));
};

exports.checkCode = (request, response) => {
    const requestId = request.query.request_id;
    const code = request.query.code;
    console.log(`Check code ${code} for request with ID ${requestId} ...`);

    vonage.verify.check({
        request_id: requestId,
        code,
    }, (error, result) => processResult(error, result, response));
};
