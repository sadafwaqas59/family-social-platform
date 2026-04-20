import mongoose from "mongoose"; 
// import mongoose to define schema

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  // store user name (required)

  email: {
    type: String,
    required: true,
    unique: true
  }, 
  // store unique email (no duplicates allowed)

  password: {
    type: String,
    required: true
  }, 
  // store hashed password (not plain text)

  familyId: {
    type: mongoose.Schema.Types.ObjectId,
    relation: "relation",
    default: null
  } 
  // link user to a family (null if not joined)

}, { timestamps: true }); 
// adds createdAt & updatedAt automatically


export default mongoose.model("User", userSchema); 
// export model