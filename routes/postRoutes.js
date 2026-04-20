import express from "express";
import Post from "../models/Post.js";
import Family from "../models/Family.js";

import multer from "multer";
import path from "path";

const router = express.Router();

// 🖼 multer config
const storage = multer.diskStorage({
  destination: "./public/uploads/", // folder
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  }
});

const upload = multer({ storage });

// ✍️ CREATE POST
router.post("/post/create", upload.single("image"), async (req, res) => {
  const userId = req.session.userId; // logged user
  if (!userId) return res.redirect("/login");

  const family = await Family.findOne({ members: userId }); // find family
  if (!family) return res.send("No family found");

  await Post.create({
    userId,
    familyId: family._id,
    content: req.body.content,
    image: req.file ? "/uploads/" + req.file.filename : null // save image
  });

  res.redirect("/feed");
});

// ❤️ LIKE / UNLIKE
router.get("/post/like/:id", async (req, res) => {
  const userId = req.session.userId; // current user
  if (!userId) return res.redirect("/login");

  const post = await Post.findById(req.params.id); // find post
  if (!post) return res.send("Post not found");

  const index = post.likes.indexOf(userId); // check like

  if (index === -1) {
    post.likes.push(userId); // like
  } else {
    post.likes.splice(index, 1); // unlike
  }

  await post.save(); // save

  res.redirect("/feed");
});

// 💬 ADD COMMENT
router.post("/post/comment/:id", async (req, res) => {
  const userId = req.session.userId; // current user
  if (!userId) return res.redirect("/login");

  const post = await Post.findById(req.params.id); // find post
  if (!post) return res.send("Post not found");

  post.comments.push({
    userId,
    text: req.body.text // comment text
  });

  await post.save(); // save

  res.redirect("/feed");
});

// 📥 FEED
router.get("/feed", async (req, res) => {
  const userId = req.session.userId; // current user
  if (!userId) return res.redirect("/login");

  const family = await Family.findOne({ members: userId }); // find family
  if (!family) return res.send("Create or join a family first");

  const posts = await Post.find({
    familyId: family._id
  })
    .populate("userId") // post user
    .populate("comments.userId"); // comment user

  res.render("feed", { posts }); // render page
});

export default router;