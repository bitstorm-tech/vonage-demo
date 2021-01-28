const Vonage = require('@vonage/server-sdk');
const Appointment = require('./models/appointment');

const apiKey = process.env.VONAGE_API_KEY;
const apiSecret = process.env.VONAGE_SECRET;

if (!apiKey || !apiSecret) {
    console.error('Please provide NEXMO_API_KEY and NEXMO_SECRET as environment variables!');
    process.exit();
}

const vonage = new Vonage({apiKey, apiSecret}, {debug: false});

function processResult(error, result, response) {
    if (error) {
        console.error('Error:', error);
        response.send('Error: ' + error);
    } else {
        console.log('Result:', result);
        response.send('Result: ' + result);
    }
}

exports.requestCode = (request, response) => {
    console.log('Requesting code ...');
    const phoneNumber = request.query.phone_number;

    if (!phoneNumber) {
        console.error('Missing phone number');
        response.status(404).send('Missing phone number');
        return;
    }

    vonage.verify.request({
        number: phoneNumber,
        brand: 'CoronaAppointment',
    }, (error, result) => {
        if (error) {
            console.error('Error:', error);
            response.status(500).send({error});
        } else {
            console.log('Result:', result);
            Appointment
                .findOneAndUpdate({phoneNumber}, {requestId: result.request_id}, {upsert: true, useFindAndModify: false})
                .then(() => {
                    response.json({requestId: result.request_id});
                })
                .catch(error => {
                    console.error('Error while saving appointment to DB:', error);
                    response.status(500).send({error});
                });
        }
    });
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
