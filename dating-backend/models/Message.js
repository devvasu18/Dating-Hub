// backend/models/Message.js
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  sender: { type: String, required: true },    // user id / guest id
  receiver: { type: String, required: true },  // user id / guest id
  text: { type: String, required: true },
  time: { type: Date, default: Date.now },
  senderIsGuest: { type: Boolean, default: false } // optional tag
});

export default mongoose.model('Message', MessageSchema);
