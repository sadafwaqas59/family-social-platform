import express from "express";
// import express

import Announcement from "../models/Announcement.js";
// announcement model

import User from "../models/User.js";
// user model

const router = express.Router();
// create router



// ================= ANNOUNCEMENT PAGE =================
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

  // must have family
  if (!user.familyId) {

    return res.send(
      "Create or join family first ❌"
    );
  }

  // get family announcements
  const announcements = await Announcement.find({

    familyId: user.familyId

  }).sort({ createdAt: -1 });

  // render page
  res.render("announcements", {

    announcements
  });
});



// ================= CREATE ANNOUNCEMENT =================
router.post("/create", async (req, res) => {

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

  // create announcement
  await Announcement.create({

    title: req.body.title,

    message: req.body.message,

    familyId: user.familyId
  });

  // reload page
  res.redirect("/announcements");
});



export default router;
// export router