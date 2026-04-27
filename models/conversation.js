import mongoose from "mongoose";

// store chat between users
const conversationSchema = new mongoose.Schema({
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // users in chat
  lastMessage: String, // last message preview
  updatedAt: { type: Date, default: Date.now } // last activity
});

export default mongoose.model("Conversation", conversationSchema);