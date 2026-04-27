import express from "express";
import multer from "multer";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import Typing from "../models/Typing.js";

const router = express.Router();

// Multer (image upload) 
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

//  Create / Get Conversation
router.post("/conversation", async (req, res) => {
  const { senderId, receiverId } = req.body;

  let convo = await Conversation.findOne({
    members: { $all: [senderId, receiverId] }
  });

  if (!convo) {
    convo = new Conversation({ members: [senderId, receiverId] });
    await convo.save();
  }

  res.json(convo);
});

// Send Message 
router.post("/send", upload.single("image"), async (req, res) => {
  const { conversationId, sender, text, replyTo } = req.body;

  const msg = new Message({
    conversationId,
    sender,
    text,
    replyTo,
    image: req.file ? req.file.filename : null
  });

  await msg.save();

  await Conversation.findByIdAndUpdate(conversationId, {
    lastMessage: text || "📷 Image",
    updatedAt: Date.now()
  });

  res.json(msg);
});

// Get Messages 
router.get("/:conversationId", async (req, res) => {
  const messages = await Message.find({
    conversationId: req.params.conversationId
  })
    .populate("sender", "name profilePic") // get sender name + image
    .populate({
      path: "replyTo",
      populate: { path: "sender", select: "name" } // reply sender name
    })
    .sort({ createdAt: 1 });

  res.json(messages);
});

//  Delete Message
router.delete("/:messageId", async (req, res) => {
  await Message.findByIdAndUpdate(req.params.messageId, {
    deleted: true
  });

  res.json({ message: "Deleted" });
});

//  Mark Seen
router.put("/seen/:conversationId/:userId", async (req, res) => {
  await Message.updateMany(
    {
      conversationId: req.params.conversationId,
      sender: { $ne: req.params.userId }
    },
    { seen: true }
  );

  res.json({ message: "Seen updated" });
});

//  Typing 
router.post("/typing", async (req, res) => {
  const { conversationId, userId, isTyping } = req.body;

  await Typing.findOneAndUpdate(
    { conversationId, userId },
    { isTyping, updatedAt: Date.now() },
    { upsert: true }
  );

  res.json({ status: "typing" });
});

//  Get Typing 
router.get("/typing/:conversationId", async (req, res) => {
  const users = await Typing.find({
    conversationId: req.params.conversationId,
    isTyping: true
  });

  res.json(users);
});

export default router;