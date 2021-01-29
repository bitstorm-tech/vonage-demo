const {vonage} = require('./vonage-utils');

exports.insight = (request, response) => {
    console.log('Get phone number insights ...');
    const phoneNumber = request.query.phone_number;

    if (!phoneNumber) {
        console.error('Missing phone number');
        response.status(404).send('Missing phone number');
        return;
    }

    vonage.numberInsight.get({
            level: 'advancedSync',
            number: phoneNumber,
        },
        (error, result) => {
            if (error) {

            } else {
                response.json(result);
            }
        });
};
