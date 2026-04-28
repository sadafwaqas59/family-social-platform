import mongoose from "mongoose"; 
// 👉 Imports mongoose to work with MongoDB

const notificationSchema = new mongoose.Schema(
  {
    message: { type: String, required: true }, 
    // Stores notification text (must be provided)

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
    // Links notification to a specific user

    familyId: { type: mongoose.Schema.Types.ObjectId, ref: "Family" }, 
    // Links notification to a family group

    isRead: { type: Boolean, default: false } 
    // Tracks if notification is read (default = unread)
  },
  { timestamps: true } 
  // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model("Notification", notificationSchema); 
//  Creates and exports Notification model to use in app