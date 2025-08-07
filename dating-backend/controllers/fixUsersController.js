// controllers/fixUsersController.js

import bcrypt from "bcrypt";
import User from "../models/User.js";

export const fixUsers = async (req, res) => {
  try {
    const users = await User.find();
    let fixedCount = 0;

    for (const user of users) {
      let changed = false;

      // Default image if images array is empty
      if (!user.images || user.images.length === 0) {
        user.images = [
          "https://img.freepik.com/premium-vector/social-media-logo_1305298-29989.jpg"
        ];
        changed = true;
      }

      // Hash password if not hashed
    if (user.password && !user.password.startsWith("$2b$")) {
  user.password = await bcrypt.hash(user.password, 12);
  changed = true;
}

      if (changed) {
        await user.save();
        fixedCount++;
      }
    }

    return res.status(200).json({
      message: `✅ ${fixedCount} users fixed successfully.`,
    });
  } catch (err) {
    console.error("❌ Error in fixUsers controller:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
