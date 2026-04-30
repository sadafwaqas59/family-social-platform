import mg from "../config/mailgun.js"; // import default mg

export const sendEmail = async (to, subject, text) => { // reusable function
  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, { // send email
      from: `Family App <mailgun@${process.env.MAILGUN_DOMAIN}>`, // correct sender
      to: [to], // receiver
      subject: subject, // subject
      text: text // message
    });

    console.log("Email sent"); // success log
  } catch (err) {
    console.log("Email error:", err); // error log
  }
};