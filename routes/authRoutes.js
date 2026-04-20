import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// 🟢 AUTH PAGE (login + signup)
router.get("/auth", (req, res) => {
  res.render("auth"); // show auth page
});

// 🟢 SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body; // form data

  const exists = await User.findOne({ email }); // check user exists
  if (exists) return res.send("User already exists");

  const hash = await bcrypt.hash(password, 10); // hash password

  await User.create({ name, email, password: hash }); // save user

  res.redirect("/auth"); // back to login
});

// 🟢 LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // login data

  const user = await User.findOne({ email }); // find user
  if (!user) return res.send("User not found");

  const match = await bcrypt.compare(password, user.password); // check password
  if (!match) return res.send("Wrong password");

  req.session.userId = user._id; // save session

  res.redirect("/feed"); // ✅ FIXED: go to main app
});

// 🟢 LOGOUT
router.get("/logout", (req, res) => {
  req.session.destroy(); // clear session
  res.redirect("/auth"); // back to login
});

export default router;