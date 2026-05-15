import "./config/env.js"; // load environment variables (.env)
import express from "express"; // import express framework
import session from "express-session"; // session system for login
import connectDB from "./config/db.js"; // connect MongoDB database
import expenseRoutes from "./routes/expenseRoutes.js"// import expense routes
import authRoutes from "./routes/authRoutes.js"; // authentication routes
import familyRoutes from "./routes/familyRoutes.js"; // family system routes
import postRoutes from "./routes/postRoutes.js"; // post system routes
import messageRoutes from "./routes/messageRoutes.js"; // chat system routes
import notificationRoutes from "./routes/notificationRoutes.js"; // notifications routes
import inviteRoutes from "./routes/inviteRoutes.js"; // invite system routes
import announcementRoutes from "./routes/announcementRoutes.js";


const app = express(); // create express app instance

connectDB(); // connect to MongoDB database


// ================= BODY PARSING =================
app.use(express.urlencoded({ extended: true })); // read form data (HTML forms)
app.use(express.json()); // read JSON data from requests


// ================= SESSION SETUP =================
app.set("trust proxy", 1); // fix session issues in localhost/deployment

app.use(session({
  secret: "secret123", // encrypt session data
  resave: false, // don't save session if unchanged
  saveUninitialized: false, // don't create empty sessions
  cookie: {
    httpOnly: true, // prevent JS access to cookies (security)
    secure: false // allow HTTP (important for localhost)
  }
}));


// ================= DEBUG MIDDLEWARE =================
app.use((req, res, next) => {
  console.log("SESSION USER ID:", req.session.userId); // check login session
  next(); // move to next route
});


// ================= STATIC FILES =================
app.use(express.static("public")); // serve public files (CSS, JS, images)
app.use("/uploads", express.static("public/uploads")); // serve uploaded images


// ================= VIEW ENGINE =================
app.set("view engine", "ejs"); // use EJS templating engine
app.set("views", "./views"); // set views folder path


// ================= ROUTES =================
app.use("/", authRoutes); // login/register system
app.use("/", familyRoutes); // family system (create/join)
app.use("/", postRoutes); // posts, likes, comments, feed
app.use("/messages", messageRoutes); // messaging system
app.use("/notifications", notificationRoutes); // notifications system
app.use("/invite", inviteRoutes); // invite system
app.use("/expenses", expenseRoutes);// expense system routes
app.use("/announcements", announcementRoutes);


// ================= DEFAULT ROUTE =================
app.get("/", (req, res) => {
  res.redirect("/auth"); // redirect home to login page
});


// ================= SERVER START =================
app.listen(4000, () => {
  console.log("Server running on http://localhost:4000"); // server started
});