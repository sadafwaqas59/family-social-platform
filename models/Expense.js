import mongoose from "mongoose"; // import mongoose

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true }, //  expense name
  amount: { type: Number, required: true }, //  expense amount
  familyId: { type: mongoose.Schema.Types.ObjectId, ref: "Family" }, // family link
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" } //  who created expense
}, { timestamps: true }); //  auto dates

export default mongoose.model("Expense", expenseSchema); // export model