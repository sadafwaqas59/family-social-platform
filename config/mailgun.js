import Mailgun from "mailgun.js"; // import mailgun
import formData from "form-data"; //  required package

const mailgun = new Mailgun(formData); //  initialize mailgun

const mg = mailgun.client({ // create client
  username: "api", // default username
  key: process.env.MAILGUN_API_KEY //  API key from env
});

export default mg; // export client