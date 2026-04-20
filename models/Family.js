import mongoose from "mongoose"; // import mongoose

const familySchema = new mongoose.Schema({ // define schema
  name: String, // family member name
  relation: String,// relation 
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // creator
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // members list
});

export default mongoose.model("Family", familySchema); // export model