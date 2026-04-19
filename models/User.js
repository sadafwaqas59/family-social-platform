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
  } 
  // store hashed password (not plain text)

}, { timestamps: true }); 
// automatically adds createdAt & updatedAt

export default mongoose.model("User", userSchema); 
// export model to use in routes