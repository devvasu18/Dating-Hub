// backend/routes/messageRoutes.js
import express from "express";
import { getMessages, sendMessage, markRead, getRecentChats } from "../controllers/messageController.js";

const router = express.Router();

router.get("/:userId1/:userId2", getMessages);
router.post("/", sendMessage);

// new endpoints:
router.post("/mark-read", markRead);
router.get("/recent/:userId", getRecentChats);

export default router;
