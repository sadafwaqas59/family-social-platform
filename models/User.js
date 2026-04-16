import mongoose from "mongoose"; // import mongoose

const userSchema = new mongoose.Schema({
  name: String, // user name
  email: String, // user email
  password: String // user password
});

export default mongoose.model("User", userSchema); // create model