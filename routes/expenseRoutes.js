import express from "express"; //  express
import Expense from "../models/Expense.js"; //  expense model
import familyOnly from "../middleware/familyOnly.js"; //  auth middleware

const router = express.Router(); //  router

// GET EXPENSES (WITH USER SPLIT)
router.get("/", familyOnly, async (req, res) => {
  const expenses = await Expense.find({ familyId: req.user.familyId }); //  get all family expenses

  const myExpenses = expenses.filter(e => e.createdBy.toString() === req.user._id.toString()); // 👉 user expenses
  const total = expenses.reduce((sum, e) => sum + e.amount, 0); // family total

  res.render("expenses", { expenses, myExpenses, total }); //  send data to UI
});

// CREATE EXPENSE
router.post("/create", familyOnly, async (req, res) => {
  await Expense.create({
    title: req.body.title, // title
    amount: req.body.amount, //  amount
    familyId: req.user.familyId, // family
    createdBy: req.user._id //  user
  });

  res.redirect("/expenses"); //  redirect
});

// EDIT PAGE
router.get("/edit/:id", familyOnly, async (req, res) => {
  const expense = await Expense.findById(req.params.id); // find expense
  res.render("editExpense", { expense }); //  open edit page
});

// UPDATE EXPENSE
router.post("/update/:id", familyOnly, async (req, res) => {
  await Expense.findByIdAndUpdate(req.params.id, {
    title: req.body.title, // update title
    amount: req.body.amount // update amount
  });

  res.redirect("/expenses"); // redirect
});

// DELETE EXPENSE
router.post("/delete/:id", familyOnly, async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id); // delete expense
  res.redirect("/expenses"); // redirect
});

export default router; //  export router