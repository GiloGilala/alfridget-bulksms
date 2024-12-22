// config/africaTalkingConfig.js

import AfricaTalking from "africastalking";

// Africa's Talking Configuration
const africaTalkingConfig = AfricaTalking({
  username: process.env.AFRICA_TALKING_USERNAME,
  apiKey: process.env.AFRICA_TALKING_API_KEY,
});

// const africaTalkingConfig = AfricaTalking({
//   username:
//     process.env.NODE_ENV === "production"
//       ? process.env.AFRICA_TALKING_USERNAME
//       : "sandbox",
//   apiKey:
//     process.env.NODE_ENV === "production"
//       ? process.env.AFRICA_TALKING_API_KEY
//       : "atsk_47bd094fee03ff6ba76bfe23dc685c16d6df2fc574dcdff3e6d779aaeebb1a83821e2137",
// });

// Exporting individual services for usage
export const SMS = africaTalkingConfig.SMS;
export const Airtime = africaTalkingConfig.AIRTIME; // Optional if you use Airtime services
export const Payments = africaTalkingConfig.PAYMENTS; // Optional for Payments
export const Voice = africaTalkingConfig.VOICE; // Optional for Voice services

export default africaTalkingConfig;
