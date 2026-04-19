import express from "express";
import session from "express-session"; 
// session import

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// connect database
connectDB();

// middleware
app.use(express.urlencoded({ extended: true })); 
// parse form data

app.use(session({
  secret: "secret123",
  resave: false,
  saveUninitialized: true
})); 
// session setup

app.set("view engine", "ejs"); 
// enable EJS

app.set("views", "./views"); 
// set views folder

// routes
app.use("/", authRoutes);

// start server
app.listen(4000, () => {
  console.log("Server running on port 4000");
});