import express from "express";
import { fixUsers } from "../controllers/fixUsersController.js";

const router = express.Router();

// Optional: add admin auth middleware here
router.post("/fix-users", fixUsers);

export default router;