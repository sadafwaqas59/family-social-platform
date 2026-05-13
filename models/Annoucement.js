import mongoose from "mongoose";

// announcement schema
const announcementSchema = new mongoose.Schema({

  // announcement text
  text: String,

  // family visibility
  familyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Family"
  }

}, { timestamps: true });

export default mongoose.model(
  "Announcement",
  announcementSchema
);