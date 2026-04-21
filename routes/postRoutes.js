import express from "express"; // router
import Post from "../models/Post.js"; // post model
import Family from "../models/Family.js"; // family model
import multer from "multer"; // image upload
import path from "path"; // file path

const router = express.Router(); // init router

// MULTER CONFIG (image upload setup)
const storage = multer.diskStorage({
  destination: "./public/uploads/", // save images here
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) cb(null, true); // allow only images
    else cb("Only images allowed!", false);
  }
});

// CREATE POST (text + image)
router.post("/post/create", upload.single("image"), async (req, res) => {
  const userId = req.session.userId; // logged user

  if (!userId) return res.redirect("/auth"); // protect route

  
  await Post.create({
  userId,
    content: req.body.content,
    image: req.file ? "/uploads/" + req.file.filename : null, // save image path
    likes: [],
    comments: []
  });

  res.redirect("/feed"); // go feed
});

//  LIKE POST
router.get("/post/like/:id", async (req, res) => {
  const userId = req.session.userId; // user

  if (!userId) return res.redirect("/auth"); // protect

  const post = await Post.findById(req.params.id); // find post

  if (!post.likes.includes(userId)) {
    post.likes.push(userId); // add like
  }

  await post.save(); // save

  res.redirect("/feed"); // reload
});

//  ADD COMMENT
router.post("/post/comment/:id", async (req, res) => {
  const userId = req.session.userId; // user

  if (!userId) return res.redirect("/auth"); // protect

  const post = await Post.findById(req.params.id); // find post

  post.comments.push({
    userId,
    text: req.body.text
  }); // add comment

  await post.save(); // save

  res.redirect("/feed"); // reload
});
// FEED
router.get("/feed", async (req, res) => {
  const userId = req.session.userId;

  if (!userId) return res.redirect("/auth");

  const posts = await Post.find()
    .populate("userId")
    .populate("comments.userId")
    .sort({ _id: -1 });

  res.render("feed", { posts });
});
export default router; // export