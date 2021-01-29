const Vonage = require('@vonage/server-sdk');
const apiKey = process.env.VONAGE_API_KEY;
const apiSecret = process.env.VONAGE_SECRET;

if (!apiKey || !apiSecret) {
    console.error('Please provide NEXMO_API_KEY and NEXMO_SECRET as environment variables!');
    process.exit();
}

exports.vonage = new Vonage({apiKey, apiSecret}, {debug: false});
