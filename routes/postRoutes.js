import express from "express"; // express router
import Post from "../models/Post.js"; // post model
import Family from "../models/Family.js"; // family model (optional use)
import User from "../models/User.js"; // user model (needed)
import multer from "multer"; // image upload
import path from "path"; // file path
import familyOnly from "../middleware/familyOnly.js"; // permission middleware

const router = express.Router(); // create router

//  MULTER CONFIG 
const storage = multer.diskStorage({
  destination: "./public/uploads/", // folder to save images
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) cb(null, true); // allow images only
    else cb("Only images allowed!", false); // reject others
  }
});

// CREATE POST 
router.post("/post/create", upload.single("image"), async (req, res) => {
  const userId = req.session.userId; // logged-in user

  if (!userId) return res.redirect("/auth"); // protect route

  const user = await User.findById(userId); // get user

  if (!user.familyId) return res.send("Join a family first ❗"); // must have family

  await Post.create({
    userId,
    familyId: user.familyId, // save family
    content: req.body.content,
    image: req.file ? "/uploads/" + req.file.filename : null,
    likes: [],
    comments: []
  });

  res.redirect("/feed"); // go to feed
});

//  LIKE POST 
router.get("/post/like/:id", familyOnly, async (req, res) => {
  const userId = req.session.userId; // user

  const post = await Post.findById(req.params.id); // find post

  if (!post.likes.includes(userId)) {
    post.likes.push(userId); // add like
  }

  await post.save(); // save

  res.redirect("/feed"); // reload
});

//  COMMENT 
router.post("/post/comment/:id", familyOnly, async (req, res) => {
  const userId = req.session.userId; // user

  const post = await Post.findById(req.params.id); // find post

  post.comments.push({
    userId,
    text: req.body.text
  });

  await post.save(); // save

  res.redirect("/feed"); // reload
});

//  FEED
router.get("/feed", async (req, res) => { //This route fetches and displays posts
  const userId = req.session.userId; // user

  if (!userId) return res.redirect("/auth"); // protect

  const user = await User.findById(userId); // get user

  const posts = await Post.find({ familyId: user.familyId }) // only family posts(privacy)
    .populate("userId")
    .populate("comments.userId")
    .sort({ _id: -1 });

  res.render("feed", { posts }); // render feed( Sends data to frontend (EJS page) to display posts)
});

export default router; // export router