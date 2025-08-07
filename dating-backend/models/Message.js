// models/Message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// ✅ Export properly for ESM
const Message = mongoose.model("Message", messageSchema);
export default Message;
