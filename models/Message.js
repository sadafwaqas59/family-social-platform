import mongoose from "mongoose"; // import mongoose

const messageSchema = new mongoose.Schema({ // define schema
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // sender user
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // receiver user
  text: String, // message text
  createdAt: { type: Date, default: Date.now } // timestamp
});

export default mongoose.model("Message", messageSchema); // export model