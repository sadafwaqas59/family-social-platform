import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // post owner
  familyId: { type: mongoose.Schema.Types.ObjectId, ref: "Family" }, // family

  content: String, // text
  image: String, // image path

  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" } // liked users
  ],

  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // commenter
      text: String, // comment
      createdAt: { type: Date, default: Date.now } // time
    }
  ]
}, { timestamps: true }); // auto time

export default mongoose.model("Post", postSchema);