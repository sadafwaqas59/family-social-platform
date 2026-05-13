import express from "express";
// import express

import Expense from "../models/Expense.js";
// import expense model

import User from "../models/User.js";
// import user model

const router = express.Router();
// create router



// ================= EXPENSE PAGE =================
router.get("/", async (req, res) => {

  // must login
  if (!req.session.userId) {

    return res.redirect("/auth");
  }

  // logged user
  const user = await User.findById(
    req.session.userId
  );

  // get family expenses
  const expenses = await Expense.find({

    familyId: user.familyId

  })
  .populate("paidBy")
  .sort({ createdAt: -1 });


  // calculate total
  const total = expenses.reduce(

    (sum, expense) => sum + expense.amount,

    0
  );


  // open page
  res.render("expenses", {

    expenses,

    total
  });
});



// ================= ADD EXPENSE =================
router.post("/add", async (req, res) => {

  // logged user
  const user = await User.findById(
    req.session.userId
  );

  // create expense
  await Expense.create({

    title: req.body.title,

    amount: req.body.amount,

    paidBy: user._id,

    familyId: user.familyId
  });

  // reload page
  res.redirect("/expenses");
});



export default router;
// export routes