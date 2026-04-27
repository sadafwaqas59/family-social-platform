import express from "express";
import session from "express-session";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import familyRoutes from "./routes/familyRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

const app = express();

//  connect DB
connectDB();

//  parse form data
app.use(express.urlencoded({ extended: true }));

//  session middleware (login system)
app.use(session({
  secret: "secret123",
  resave: false,
  saveUninitialized: true
}));

//  enable static files (images, css, uploads)
app.use(express.static("public"));// serve images
app.use("/uploads", express.static("public/uploads")); // serve images
app.use("/messages", messageRoutes);

//  enable EJS
app.set("view engine", "ejs");
app.set("views", "./views");

//  routes
app.use("/", authRoutes);
app.use("/", familyRoutes);
app.use("/", postRoutes);
//  start server
app.listen(4000, () => {
  console.log("Server running on port 4000");
});