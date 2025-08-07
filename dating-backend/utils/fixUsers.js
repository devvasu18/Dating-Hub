import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js"; // Make sure your User model is also ESM-compatible

const MONGO_URI = "mongodb+srv://vasudevsharma:code4life%402007@cluster0.mo8nveo.mongodb.net/dating-app?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your actual DB name

async function fixUsers() {
  try {
    await mongoose.connect(MONGO_URI);
    const users = await User.find();

    for (let user of users) {
      let changed = false;

      // Add default image if empty
      if (!user.images || user.images.length === 0) {
        user.images = ["https://img.freepik.com/premium-vector/social-media-logo_1305298-29989.jpg"];
        changed = true;
      }

    if (user.password && !user.password.startsWith("$2b$")) {
  user.password = await bcrypt.hash(user.password, 12);
  changed = true;
}

      if (changed) {
        await user.save();
        console.log(`✔️ Fixed user: ${user.name}`);
      }
    }

    console.log("✅ All users processed successfully.");
  } catch (error) {
    console.error("❌ Error fixing users:", error);
  } finally {
    await mongoose.disconnect();
  }
}

// Run only if called directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  fixUsers();
}

export default fixUsers;



