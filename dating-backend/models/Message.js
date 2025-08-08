// models/Message.js
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  text: String,
  time: Date,
});

const Message = mongoose.model("Message", MessageSchema);
export default Message;
