import express from "express";
import { getRecentChats, markRead } from "../controllers/chatController.js";

const router = express.Router();

router.get("/recent/:userId", getRecentChats);
router.post("/mark-read", markRead);

export default router;