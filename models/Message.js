import mongoose from "mongoose";
// import mongoose

const messageSchema = new mongoose.Schema({

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  // who sent message

  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  // who receives message

  text: String
  // message text

}, { timestamps: true });

export default mongoose.model(
  "Message",
  messageSchema
);
// export model