import mongoose from "mongoose";

// message schema (full features)
const messageSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" }, // chat id
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // sender
  text: String, // text message
  image: String, // image path
  seen: { type: Boolean, default: false }, // seen ✔✔
  replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Message" }, // reply
  deleted: { type: Boolean, default: false }, // delete flag
  createdAt: { type: Date, default: Date.now } // time
});


export default mongoose.model("Message", messageSchema);