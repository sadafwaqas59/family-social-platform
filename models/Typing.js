import mongoose from "mongoose";

// typing status schema
const typingSchema = new mongoose.Schema({
  conversationId: mongoose.Schema.Types.ObjectId, // chat id
  userId: mongoose.Schema.Types.ObjectId, // user typing
  isTyping: Boolean, // typing true/false
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Typing", typingSchema);