import express from "express";
// import express

import Message from "../models/Message.js";
// message model

import User from "../models/User.js";
// user model

const router = express.Router();



// ================= FAMILY MEMBERS PAGE =================
router.get("/", async (req, res) => {

  try {

    // must login
    if (!req.session.userId) {

      return res.redirect("/auth");
    }

    // current user
    const currentUser = await User.findById(
      req.session.userId
    );

    // get family members except self
    const familyUsers = await User.find({

      familyId: currentUser.familyId,

      _id: { $ne: currentUser._id }
    });

    // open members page
    res.render("members", {

      familyUsers
    });

  } catch (err) {

    console.log(err);

    res.send("Members page error ❌");
  }
});



// ================= PRIVATE CHAT PAGE =================
router.get("/:id", async (req, res) => {

  try {

    // must login
    if (!req.session.userId) {

      return res.redirect("/auth");
    }

    // logged user
    const currentUser = await User.findById(
      req.session.userId
    );

    // receiver user
    const otherUser = await User.findById(
      req.params.id
    );

    // safety check
    if (!otherUser) {

      return res.send(
        "Receiver user not found ❌"
      );
    }

    // get private messages
    const messages = await Message.find({

      $or: [

        {
          sender: currentUser._id,
          receiver: otherUser._id
        },

        {
          sender: otherUser._id,
          receiver: currentUser._id
        }

      ]

    })
    .populate("sender")
    .sort({ createdAt: 1 });

    // open chat page
    res.render("chat", {

      messages,

      currentUser,

      otherUser
    });

  } catch (err) {

    console.log(err);

    res.send("Chat error ❌");
  }
});



// ================= SEND MESSAGE =================
router.post("/send/:id", async (req, res) => {

  try {

    // current user
    const currentUser = await User.findById(
      req.session.userId
    );

    // receiver user
    const otherUser = await User.findById(
      req.params.id
    );

    // safety check
    if (!otherUser) {

      return res.send(
        "Receiver not found ❌"
      );
    }

    // save message
    await Message.create({

      sender: currentUser._id,

      receiver: otherUser._id,

      text: req.body.text
    });

    // reload same chat
    res.redirect(

      `/messages/${otherUser._id}`
    );

  } catch (err) {

    console.log(err);

    res.send("Message send error ❌");
  }
});



export default router;
// export router