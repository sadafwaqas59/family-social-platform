import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

  content: String,

  image: String,

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  familyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Family"
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  comments: [{

    text: String,

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  }]

}, { timestamps: true });

export default mongoose.model("Post", postSchema);