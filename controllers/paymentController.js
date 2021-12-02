const {Client, Config, CheckoutAPI} = require('@adyen/api-library');
const config = new Config();
// Set your X-API-KEY with the API key from the Customer Area.
config.apiKey = '[YOUR_X-API-KEY]';
config.merchantAccount = '[YOUR_MERCHANT_ACCOUNT]';
const client = new Client({ config });
client.setEnvironment("TEST");
const checkout = new CheckoutAPI(client);
const paymentsResponse = checkout.paymentMethods({
    merchantAccount: config.merchantAccount,
    countryCode: "NL",
    shopperLocale: "nl-NL",
    amount: { currency: "EUR", value: 1000, },
    channel: "Web"
}).then(res => res);
