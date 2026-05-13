import express from "express";
// import express

import Message from "../models/Message.js";
// import message model

import User from "../models/User.js";
// import user model

const router = express.Router();
// create router



// ================= CHAT PAGE =================
router.get("/", async (req, res) => {

  // must login
  if (!req.session.userId) {

    return res.redirect("/auth");
  }

  // logged user
  const user = await User.findById(
    req.session.userId
  );

  // safety check
  if (!user) {

    return res.redirect("/auth");
  }

  console.log(
    "USER FAMILY:",
    user.familyId
  );
  // debug family id


  // get family messages
  const messages = await Message.find({

    familyId: user.familyId

  })
  .populate("sender")
  .sort({ createdAt: 1 });

  console.log(messages);
  // debug messages


  // render page
  res.render("chat", {

    messages,

    user
  });
});



// ================= SEND MESSAGE =================
router.post("/send", async (req, res) => {

  // must login
  if (!req.session.userId) {

    return res.redirect("/auth");
  }

  // logged user
  const user = await User.findById(
    req.session.userId
  );

  // safety check
  if (!user) {

    return res.redirect("/auth");
  }

  console.log(
    "SENDING FAMILY:",
    user.familyId
  );
  // debug family id


  // create message
  const newMessage = await Message.create({

    sender: user._id,

    familyId: user.familyId,

    text: req.body.text
  });

  console.log(newMessage);
  // debug message


  // reload chat
  res.redirect("/messages");
});



export default router;
// export router