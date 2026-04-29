import mg from "../config/mailgun.js"; // import mailgun config

export const sendEmail = async (to, subject, text) => { //  reusable function
  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, { //  send email
      from: "Family App <mail@YOUR_DOMAIN>", //  sender email
      to: [to], //  receiver email
      subject: subject, // subject
      text: text //  message
    });
    console.log("Email sent"); // success log
  } catch (err) {
    console.log("Email error:", err); //  error log
  }
};