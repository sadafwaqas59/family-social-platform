import mongoose from "mongoose"; // import mongoose for DB

const connectDB = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/familyDB"); // connect DB
  console.log("MongoDB Connected");
};

export default connectDB; // export function