import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({

  title: String,
  // announcement title

  message: String,
  // announcement text

  familyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Family"
  }
  // family visibility

}, { timestamps: true });

export default mongoose.model(
  "Announcement",
  announcementSchema
);