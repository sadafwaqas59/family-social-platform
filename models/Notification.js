// ================= models/Notification.js =================

import mongoose from "mongoose";
// import mongoose

const notificationSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  // notification receiver

  text: String,
  // notification message

  isRead: {
    type: Boolean,
    default: false
  }
  // read/unread status

}, { timestamps: true });
// auto create time

export default mongoose.model(
  "Notification",
  notificationSchema
);
// export model