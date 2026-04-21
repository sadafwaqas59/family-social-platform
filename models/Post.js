import mongoose from "mongoose"; // mongoose

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // comment user
  text: String // comment text
});

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // post owner
  familyId: { type: mongoose.Schema.Types.ObjectId, ref: "Family" }, // family
  content: String, // text
  image: String, // image path
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // likes
  comments: [commentSchema] // comments
});

export default mongoose.model("Post", postSchema); // export