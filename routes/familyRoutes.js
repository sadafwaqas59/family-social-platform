import express from "express"; // router
import Family from "../models/Family.js"; // family model
import User from "../models/User.js"; // user model

const router = express.Router(); // create router

//  CREATE FAMILY 
router.post("/family/create", async (req, res) => {
  const { name } = req.body; // get family name

  const family = await Family.create({
    name,
    createdBy: req.session.userId,
    members: [req.session.userId] // creator is first member
  });

  await User.findByIdAndUpdate(req.session.userId, {
    familyId: family._id // attach family to user
  });

  res.redirect("/dashboard"); // go back
});

// ADD MEMBER 
router.post("/family/add", async (req, res) => {
  const { email } = req.body; // get member email

  const user = await User.findOne({ email }); // find user
  if (!user) return res.send("User not found");

  const family = await Family.findOne({ members: req.session.userId }); // find current family

  family.members.push(user._id); // add member
  await family.save(); // save changes

  await User.findByIdAndUpdate(user._id, {
    familyId: family._id // assign family to new member
  });

  res.redirect("/family"); // reload page
});

//  VIEW FAMILY 
router.get("/family", async (req, res) => {
  const family = await Family.findOne({ members: req.session.userId }).populate("members"); // get family

  res.render("family", { family }); // show page
});

export default router; // export router