import express from "express"; // import express
import Message from "../models/Message.js"; // import message model
import User from "../models/User.js"; // import user model

const router = express.Router(); // create router


//  SEND MESSAGE 
router.post("/message/send/:id", async (req, res) => { // send message route
  const senderId = req.session.userId; // logged-in user
  const receiverId = req.params.id; // receiver user id

  if (!senderId) return res.redirect("/auth"); // protect route

  const sender = await User.findById(senderId); // get sender
  const receiver = await User.findById(receiverId); // get receiver

  if (sender.familyId.toString() !== receiver.familyId.toString()) { // check same family
    return res.send("Not allowed "); // block if different family
  }

  await Message.create({ // create message
    senderId,
    receiverId,
    text: req.body.text
  });

  res.redirect("/chat/" + receiverId); // redirect to chat
});


// CHAT PAGE 
router.get("/chat/:id", async (req, res) => { // open chat route
  const userId = req.session.userId; // logged-in user
  const otherUserId = req.params.id; // other user

  if (!userId) return res.redirect("/auth"); // protect route

  const messages = await Message.find({ // get messages
    $or: [
      { senderId: userId, receiverId: otherUserId }, // sent messages
      { senderId: otherUserId, receiverId: userId } // received messages
    ]
  }).sort({ createdAt: 1 }); // sort by time

  const otherUser = await User.findById(otherUserId); // get other user info

  res.render("chat", { messages, otherUser }); // render chat page
});

export default router; // export router