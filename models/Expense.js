import mongoose from "mongoose";
// import mongoose

const expenseSchema = new mongoose.Schema({

  title: String,
  // expense title

  amount: Number,
  // expense amount

  paidBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  // who paid expense

  familyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Family"
  }
  // family visibility

}, { timestamps: true });
// auto timestamps

export default mongoose.model(
  "Expense",
  expenseSchema
);
// export expense model