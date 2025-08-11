// models/Message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },    // guest ID or user._id
  receiver: { type: String, required: true },  // guest ID or user._id
  content: { type: String, required: true },   // renamed from "text" for clarity
  timestamp: { type: Date, default: Date.now } // default auto-time
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
