import Post from "../models/Post.js"; // post model
import User from "../models/User.js"; // user model

const familyOnly = async (req, res, next) => {
  try {
    const userId = req.session.userId; // logged-in user

    if (!userId) return res.redirect("/auth"); // must login first

    const user = await User.findById(userId); // get user
    if (!user) return res.redirect("/auth"); // safety check

    const post = await Post.findById(req.params.id); // get post
    if (!post) return res.send("Post not found "); // safety check

    // ❗ FIX: block only if user has no family
    if (!user.familyId) {
      return res.redirect("/family"); // user must join/create family
    }

    // ❗ FIX: block only if post has no family (bad data protection)
    if (!post.familyId) {
      return res.send("Post has no family "); // invalid post
    }

    // ✅ check same family
    if (user.familyId.toString() !== post.familyId.toString()) {
      return res.send("Access denied Not your family post"); // block access
    }

    next(); // allow request
  } catch (err) {
    console.log(err); // log error for debugging
    res.send("Server error "); // safe fallback
  }
};

export default familyOnly; // export middleware