import Notification from "../models/Notification.js"; // import notification
import User from "../models/User.js"; // import user

router.post("/create", familyOnly, async (req, res) => { // create announcement
  const announcement = await Announcement.create({ // save announcement
    content: req.body.content, // text
    familyId: req.user.familyId, // family id
    createdBy: req.user._id // creator
  });

  const users = await User.find({ familyId: req.user.familyId }); // get family users

  const notifications = users.map(user => ({ // create notifications
    message: `New announcement: ${announcement.content}`, // message text
    userId: user._id, // user id
    familyId: req.user.familyId // family id
  }));

  await Notification.insertMany(notifications); // save all notifications

  res.redirect("/announcements"); // redirect
});