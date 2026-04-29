import express from "express"; // import express
import { sendEmail } from "../utils/sendEmail.js"; //  import email

const router = express.Router(); //  create router

//  SEND INVITE EMAIL
router.post("/invite", async (req, res) => {
  const { email } = req.body; //  get email

  const inviteLink = `http://localhost:3000/auth/register?email=${email}`; //  invite link

  await sendEmail(
    email, //  receiver
    "Family App Invite", //  subject
    `Join using this link: ${inviteLink}` //  message
  );

  res.send("Invite sent"); //  response
});

export default router; //  export router