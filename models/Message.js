import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  familyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Family"
  },

  text: String

}, { timestamps: true });

export default mongoose.model(
  "Message",
  messageSchema
);