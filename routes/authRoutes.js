import express from "express"; //  import express
import bcrypt from "bcryptjs"; //  import bcrypt for password hashing
import User from "../models/User.js"; // import user model
import { v4 as uuidv4 } from "uuid"; //  import uuid for token
import { sendEmail } from "../utils/sendEmail.js"; //  import email function

const router = express.Router(); //  create router

//  AUTH PAGE (login + signup)
router.get("/auth", (req, res) => {
  const email = req.query.email || ""; //  prefill email if invited
  res.render("auth", { email }); //  send email to view
});

//  SIGNUP + SEND VERIFICATION EMAIL
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body; // get form data

  const exists = await User.findOne({ email }); // check if user exists
  if (exists) return res.send("User already exists"); //  prevent duplicate

  const hash = await bcrypt.hash(password, 10); //  hash password

  const token = uuidv4(); //  generate verification token

  const user = await User.create({
    name, //  save name
    email, //  save email
    password: hash, //  save hashed password
    verifyToken: token, // store token
    isVerified: false //  default not verified
  });

  const verifyLink = `http://localhost:3000/auth/verify/${token}`; //  create verify link

  await sendEmail(
    user.email, // send to user
    "Verify Your Email", //  subject
    `Click to verify your account: ${verifyLink}` //  message
  );

  res.send("Signup successful, check email to verify"); //  response
});

//  VERIFY EMAIL
router.get("/verify/:token", async (req, res) => {
  const user = await User.findOne({ verifyToken: req.params.token }); // find by token

  if (!user) return res.send("Invalid or expired token"); //  invalid case

  user.isVerified = true; //  mark verified
  user.verifyToken = null; //  remove token

  await user.save(); //  save changes

  res.send("Email verified successfully ✅"); //  success
});

//  LOGIN (BLOCK IF NOT VERIFIED)
router.post("/login", async (req, res) => {
  const { email, password } = req.body; //  get login data

  const user = await User.findOne({ email }); // find user
  if (!user) return res.send("User not found"); //  no user

  if (!user.isVerified) return res.send("Please verify your email first"); // block login

  const match = await bcrypt.compare(password, user.password); // compare password
  if (!match) return res.send("Wrong password"); //  wrong password

  req.session.userId = user._id; //  save session

  res.redirect("/feed"); //  go to app
});

//  LOGOUT
router.get("/logout", (req, res) => {
  req.session.destroy(); //  destroy session
  res.redirect("/auth"); //  back to login
});

export default router; // export router