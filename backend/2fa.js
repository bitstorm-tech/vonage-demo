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

exports.getAppointment = (request, response) => {
    const phoneNumber = request.query.phone_number;
    const code = request.query.code;
    console.log(`Get appointment for phone number ${phoneNumber} with code ${code}  ...`);

    Appointment.findOne({phoneNumber})
        .then(appointment => {
            vonage.verify.check({
                request_id: appointment.requestId,
                code,
            }, (error, result) => {
                if (error) {
                    console.error('Error:', error);
                    response.status(500).send('Error: ' + error);
                } else {
                    console.log('Result:', result);
                    console.log('Appointment: ', appointment);
                    response.json(appointment);
                }
            });
        })
        .catch(error => {
            console.error(`Error while find appointment with phone number ${phoneNumber}`, error);
            response.status(500).send(error);
        });
};
