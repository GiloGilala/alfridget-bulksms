// config/africaTalkingConfig.js

import AfricaTalking from "africastalking";

// Africa's Talking Configuration
const africaTalkingConfig = AfricaTalking({
  username: process.env.AFRICA_TALKING_USERNAME,
  apiKey: process.env.AFRICA_TALKING_API_KEY,
});

// Exporting individual services for usage
export const SMS = africaTalkingConfig.SMS;
export const Airtime = africaTalkingConfig.AIRTIME; // Optional if you use Airtime services
export const Payments = africaTalkingConfig.PAYMENTS; // Optional for Payments
export const Voice = africaTalkingConfig.VOICE; // Optional for Voice services

export default africaTalkingConfig;
