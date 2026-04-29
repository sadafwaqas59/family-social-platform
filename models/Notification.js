import mongoose from "mongoose"; // import mongoose

const notificationSchema = new mongoose.Schema( // create schema
{
  message: { type: String, required: true }, // notification text
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // user link
  familyId: { type: mongoose.Schema.Types.ObjectId, ref: "Family" }, // family link
  isRead: { type: Boolean, default: false } // read status
},
{ timestamps: true } // adds createdAt, updatedAt
);

export default mongoose.model("Notification", notificationSchema); // export model