const Vonage = require('@vonage/server-sdk');
const apiKey = process.env.VONAGE_API_KEY;
const apiSecret = process.env.VONAGE_SECRET;
const applicationId = process.env.VONAGE_APPLICATION_ID;
const privateKey = process.env.VONAGE_PRIVATE_KEY_PATH;

if (!apiKey || !apiSecret || !applicationId || !privateKey) {
    console.error('Please provide VONAGE_API_KEY, VONAGE_SECRET, VONAGE_APPLICATION_ID and VONAGE_PRIVATE_KEY_PATH as environment variables!');
    process.exit();
}

exports.vonage = new Vonage({apiKey, apiSecret, applicationId, privateKey}, {debug: false});
