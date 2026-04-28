import express from "express"; // import express
import Notification from "../models/Notification.js"; // import model
import familyOnly from "../middleware/familyOnly.js"; // auth middleware

const router = express.Router(); // create router

router.get("/", familyOnly, async (req, res) => { // get notifications
  const notifications = await Notification.find({ userId: req.user._id }) // find user notifications
    .sort({ createdAt: -1 }); // latest first

  res.render("notifications", { notifications }); // send to view
});

router.post("/read/:id", familyOnly, async (req, res) => { // mark read route
  await Notification.findByIdAndUpdate(req.params.id, { isRead: true }); // update status
  res.redirect("/notifications"); // redirect back
});

export default router; // export router