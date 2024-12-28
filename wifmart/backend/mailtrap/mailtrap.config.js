const { MailtrapClient } = require("mailtrap");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: __dirname + '/../.env' });

const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

const mailtrapClient = new MailtrapClient({
    endpoint: ENDPOINT,
    token: TOKEN,
});

const sender = {
    email: "hello@wifmart.com",
    name: "Wifmart",
};

module.exports = { mailtrapClient, sender };
