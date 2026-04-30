import formData from "form-data"; // handle form data
import Mailgun from "mailgun.js"; // Mailgun SDK
import dotenv from "dotenv"; // load env

dotenv.config(); // load .env

const mailgun = new Mailgun(formData); // init mailgun
const mg = mailgun.client({
  username: "api", // required username
  key: process.env.MAILGUN_API_KEY, // API key
});

export default mg; // ✅ export mg as default