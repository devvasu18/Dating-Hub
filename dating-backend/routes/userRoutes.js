import express from 'express';
import { discoverUsers, likeUser } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { getLikedUsers } from "../controllers/userController.js";
import { unmatchUser } from "../controllers/userController.js";
const router = express.Router();

router.get('/discover', protect, discoverUsers);
router.post('/like/:userId', protect, likeUser);  // ✅ Keep only this for like
router.get("/liked", protect, getLikedUsers);
router.delete('/unmatch/:userId', protect, unmatchUser);
export default router;
