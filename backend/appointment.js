const Appointment = require('./models/appointment');
const {vonage} = require('./vonage-utils');

exports.getAppointmentDate = (request, response) => {
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
                    response.json(appointment.appointmentDate);
                }
            });
        })
        .catch(error => {
            console.error(`Error while find appointment with phone number ${phoneNumber}:`, error);
            response.status(500).send(error);
        });
};

exports.updateAppointmentDate = (request, response) => {
    const appointmentDate = request.body.appointmentDate;
    const phoneNumber = request.params.phoneNumber;
    console.log(`Update appointment with phone number ${phoneNumber}`);

    Appointment.updateOne({phoneNumber}, {appointmentDate})
        .then(result => {
            console.log('Update complete:', result);
            response.send();
        })
        .catch(error => {
            console.error(`Error while updating appointment with phone number ${phoneNumber}:`, error);
            response.status(500).send(error);
        });
};
