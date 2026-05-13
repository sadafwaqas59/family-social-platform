import express from "express";
// import express

import multer from "multer";
// import multer

import Post from "../models/Post.js";
// import post model

import User from "../models/User.js";
// import user model


const router = express.Router();
// create router



// ================= MULTER CONFIG =================
const storage = multer.diskStorage({

  // upload folder
  destination: (req, file, cb) => {

    cb(null, "public/uploads");
  },

  // unique filename
  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  }
});


const upload = multer({
  storage
});
// initialize multer




// ================= FEED PAGE =================
router.get("/feed", async (req, res) => {

  // must login
  if (!req.session.userId) {

    return res.redirect("/auth");
  }

  // logged user
  const user = await User.findById(
    req.session.userId
  );

  // get family posts
  const posts = await Post.find({

    familyId: user.familyId

  })
  .populate("userId")
  .sort({ createdAt: -1 });

  // render feed
  res.render("feed", {

    posts,

    user
  });
});
// ================= CREATE POST =================
router.post(
  "/post/create",

  upload.single("image"),

  async (req, res) => {

    // login required
    if (!req.session.userId) {

      return res.redirect("/auth");
    }

    // logged user
    const user = await User.findById(
      req.session.userId
    );

    // safety check
    if (!user) {

      return res.redirect("/auth");
    }

    // must have family
    if (!user.familyId) {

      return res.send(
        "Join family first ❌"
      );
    }

    console.log(
      "USER FAMILY:",
      user.familyId
    );
    // debug family id


    // create post
    const newPost = await Post.create({

      content: req.body.content,

      image: req.file
        ? "/uploads/" + req.file.filename
        : "",

      userId: user._id,

      familyId: user.familyId,

      likes: [],

      comments: []
    });

    console.log(
      "POST FAMILY:",
      newPost.familyId
    );
    // debug post family id

    res.redirect("/feed");
  }
);
// ================= LIKE POST =================
router.post("/post/like/:id", async (req, res) => {

  // find post
  const post = await Post.findById(
    req.params.id
  );

  // avoid duplicate likes
  if (!post.likes.includes(req.session.userId)) {

    post.likes.push(req.session.userId);

    await post.save();
  }

  // reload page
  res.redirect("/feed");
});




// ================= COMMENT POST =================
router.post("/post/comment/:id", async (req, res) => {

  // find post
  const post = await Post.findById(
    req.params.id
  );

  // add comment
  post.comments.push({

    text: req.body.text,

    userId: req.session.userId
  });

  // save
  await post.save();

  // reload page
  res.redirect("/feed");
});



export default router;
// export router