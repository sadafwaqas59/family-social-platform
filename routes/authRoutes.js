import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send("User already exists");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.send("Signup successful");
  } catch (err) {
    console.log(err);
    res.send("Error");
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("Wrong password");

    // save user in session
    req.session.userId = user._id;

    res.send("Login successful");
  } catch (err) {
    console.log(err);
    res.send("Error");
  }
});
router.get("/", (req, res) => {
  res.render("auth"); 
  // render single auth page
});

export default router;