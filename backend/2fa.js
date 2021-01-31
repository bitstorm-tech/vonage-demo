const Appointment = require('./models/appointment');
const {vonage} = require('./vonage-utils');

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
                .findOneAndUpdate({phoneNumber}, {requestId: result.request_id}, {
                    upsert: true,
                    useFindAndModify: false,
                })
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
