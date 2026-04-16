import express from "express";
import connectDB from "./config/db.js";

const app = express();

// connect database
connectDB();

// simple route
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});

// start server
app.listen(4000, () => {
  console.log("Server running on port 3000");
});