import mongoose from "mongoose"; 
// import mongoose to define schema

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  // user name (required)

  email: {
    type: String,
    required: true,
    unique: true
  }, 
  // unique email

  password: {
    type: String,
    required: true
  }, 
  // hashed password

  profilePic: String, 
  // profile image filename

  familyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Family", // correct way to link collections
    default: null
  } 
  // user belongs to a family (or null)

}, { timestamps: true }); 
// auto adds createdAt & updatedAt

export default mongoose.model("User", userSchema); 
// export user model