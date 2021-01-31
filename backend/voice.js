const Appointment = require('./models/appointment');
const {vonage} = require('./vonage-utils');

const vonagePhoneNumber = process.env.VONAGE_PHONE_NUMBER;

exports.sendAppointmentDateAsVoiceCall = (request, response) => {
    const phoneNumber = request.params.phoneNumber;
    console.log('Make appointment call for phone number ' + phoneNumber);

    Appointment.findOne({phoneNumber})
        .then(appointment => {
            const text = appointmentDateToText(appointment.appointmentDate);

            vonage.calls.create({
                to: [{type: 'phone', number: phoneNumber}],
                from: {type: 'phone', number: vonagePhoneNumber},
                ncco: [{action: 'talk', text}],
            }, (error, result) => {
                if (error) {
                    console.error('Error:', error);
                    response.status(500).send('Error: ' + error);
                } else {
                    console.log('Result:', result);
                    response.send();
                }
            });
        })
        .catch(error => {
            console.error(`Error while find appointment with phone number ${phoneNumber} in database`, error);
            response.status(500).send(error);
        });
};

const appointmentDateToText = (appointmentDate) => {
    const date = appointmentDate.substring(0, 10);
    const time = appointmentDate.substring(11, 16);
    const text = `Hello, your Corona appointment is on ${date} at ${time}. See you soon.`;
    console.log('Call text: ', text);
    return text;
};
