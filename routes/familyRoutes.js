import express from "express"; 
// import express framework

import Family from "../models/Family.js"; 
// import family database model

import User from "../models/User.js"; 
// import user database model

import mg from "../config/mailgun.js"; 
// import mailgun email configuration

const router = express.Router(); 
// create express router

// ================= CREATE FAMILY PAGE =================
router.get("/family/create", (req, res) => {

  // open create family page
  res.render("createFamily");
});


// ================= CREATE FAMILY =================
router.post("/family/create", async (req, res) => {

  // logged user
  const userId = req.session.userId;

  // must login
  if (!userId) {

    return res.redirect("/auth");
  }

  // create family
  const family = await Family.create({

    name: req.body.name,

    createdBy: userId,

    members: [userId]
  });

  // connect family to user
  await User.findByIdAndUpdate(userId, {
    familyId: family._id
  });

  // go to feed
  res.redirect("/feed");
});


// ================= ADD FAMILY MEMBER =================
router.post("/family/add", async (req, res) => {
  // route to add new family member


  // logged in user
  const currentUser = await User.findById(
    req.session.userId
  );
  // find current logged-in user


  // current family
  const family = await Family.findById(
    currentUser.familyId
  );
  // get logged user's family


  // user to add
  const member = await User.findOne({
    email: req.body.email
  });
  // find member using entered email


  // validation
  if (!member) {
    return res.send("User not found ❌");
  }
  // show error if email not exists


  // avoid duplicates
  if (!family.members.includes(member._id)) {
    // check member already exists or not

    family.members.push(member._id);
    // add member id into family array

    await family.save();
    // save updated family
  }


  // connect user to family
  member.familyId = family._id;
  // assign family id to user

  await member.save();
  // save updated member


  // ================= SEND INVITE EMAIL =================
  await mg.messages.create(
    // send email using mailgun

    process.env.MAILGUN_DOMAIN,
    // mailgun domain from .env

    {

      from: "Family App <mail@yourdomain.com>",
      // sender email

      to: [member.email],
      // receiver email

      subject: "Family Invitation",
      // email subject

      text: `Hello ${member.name},
You were added to the family group.`
      // email message
    }
  );


  // redirect
  res.redirect("/family");
  // reload family page
});


export default router; 
// export router to use in index.js