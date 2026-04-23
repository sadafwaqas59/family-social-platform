import Post from "../models/Post.js"; // import Post model
import User from "../models/User.js"; // import User model

const familyOnly = async (req, res, next) => { // middleware to restrict access to same family
  const userId = req.session.userId; // get logged-in user ID from session

  if (!userId) return res.redirect("/auth"); // if not logged in, redirect to login

  const user = await User.findById(userId); // fetch user from database
  const post = await Post.findById(req.params.id); // fetch post using URL ID

  if (!user || !post) return res.redirect("/auth"); // if user/post not found, redirect

  if (user.familyId.toString() !== post.familyId.toString()) { // check if both belong to same family
    return res.send("Access denied "); // block access if not same family
  }

  next(); // allow request to continue if authorized
};

export default familyOnly; // export middleware for use in routes