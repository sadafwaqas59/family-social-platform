import express from "express"; // import express
import bcrypt from "bcryptjs"; // password hashing
import User from "../models/User.js"; // user model

const router = express.Router(); // create router

// AUTH PAGE (login + signup)
router.get("/auth", (req, res) => {
  const email = req.query.email || ""; // optional prefill email
  res.render("auth", { email }); // render auth page
});

// SIGNUP (NO EMAIL VERIFICATION)
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body; // get form data

  const exists = await User.findOne({ email }); // check user exists
  if (exists) return res.send("User already exists"); // stop duplicates

  const hash = await bcrypt.hash(password, 10); // hash password

  await User.create({
    name, // save name
    email, // save email
    password: hash // save hashed password
  });

  res.send("Signup successful, now login"); // success message
});

// LOGIN (NO VERIFICATION CHECK)
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // login data

  const user = await User.findOne({ email }); // find user
  if (!user) return res.send("User not found"); // check user

  const match = await bcrypt.compare(password, user.password); // verify password
  if (!match) return res.send("Wrong password"); // invalid password

  req.session.userId = user._id; // save session login

  console.log("LOGIN SUCCESS USER ID:", req.session.userId); // 🔥 DEBUG

  res.redirect("/feed"); // go to feed
});

// LOGOUT
router.get("/logout", (req, res) => {
  req.session.destroy(); // destroy session
  res.redirect("/auth"); // back to auth page
});

export default router; // export router