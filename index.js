import express from "express"; //  import express framework
import session from "express-session"; //  import session for login system
import dotenv from "dotenv"; //  import dotenv for env variables and for Mailgun keys
import connectDB from "./config/db.js"; //  import database connection

import authRoutes from "./routes/authRoutes.js"; //  auth routes (login/signup)
import familyRoutes from "./routes/familyRoutes.js"; //  family module
import postRoutes from "./routes/postRoutes.js"; //  posts module
import messageRoutes from "./routes/messageRoutes.js"; //  messaging module
import notificationRoutes from "./routes/notificationRoutes.js"; //  notifications
import inviteRoutes from "./routes/inviteRoutes.js"; //  invite email system

dotenv.config(); // load .env variables

const app = express(); // create express app

//  CONNECT DATABASE
connectDB(); // connect MongoDB

//  PARSE FORM DATA (POST requests)
app.use(express.urlencoded({ extended: true })); //  read form data

//  SESSION SETUP (login system)
app.use(session({
  secret: "secret123", // secret key (use env in production)
  resave: false, // don't save if unchanged
  saveUninitialized: true //  save new sessions
}));

// STATIC FILES (CSS, images, uploads)
app.use(express.static("public")); //  serve public folder
app.use("/uploads", express.static("public/uploads")); //  serve uploads

//  VIEW ENGINE (EJS)
app.set("view engine", "ejs"); // use ejs
app.set("views", "./views"); //  set views folder

//  ROUTES
app.use("/", authRoutes); //  auth routes
app.use("/", familyRoutes); // family routes
app.use("/", postRoutes); //  post routes
app.use("/messages", messageRoutes); //  messaging routes
app.use("/notifications", notificationRoutes); //  notification routes
app.use("/invite", inviteRoutes); //  invite email routes

//  DEFAULT ROUTE (optional safety)
app.get("/", (req, res) => {
  res.redirect("/auth"); //  redirect to login page
});

//  START SERVER
app.listen(4000, () => {
  console.log("Server running on http://localhost:4000"); //  server start log
});