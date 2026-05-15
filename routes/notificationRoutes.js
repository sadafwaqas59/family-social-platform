// ================= routes/notificationRoutes.js =================

import express from "express";
// import express

import Notification from "../models/Notification.js";
// notification model

import User from "../models/User.js";
// user model

const router = express.Router();
// create router



// ================= SHOW NOTIFICATIONS =================
router.get("/", async (req, res) => {

  // must login
  if (!req.session.userId) {

    return res.redirect("/auth");
  }

  // get all notifications
  const notifications = await Notification.find({

    userId: req.session.userId

  })
  .sort({ createdAt: -1 });

  // open page
  res.render("notifications", {

    notifications
  });
});



// ================= CREATE NOTIFICATION =================
router.post("/create", async (req, res) => {

  // current user
  const currentUser = await User.findById(
    req.session.userId
  );

  // get family members
  const familyUsers = await User.find({

    familyId: currentUser.familyId,

    _id: { $ne: currentUser._id }
  });

  // send notification to each member
  for (const member of familyUsers) {

    await Notification.create({

      userId: member._id,

      text: req.body.text
    });
  }

  // reload page
  res.redirect("/notifications");
});



// ================= MARK AS READ =================
router.get("/read/:id", async (req, res) => {

  // update notification
  await Notification.findByIdAndUpdate(

    req.params.id,

    {
      isRead: true
    }
  );

  // reload page
  res.redirect("/notifications");
});



export default router;
// export router