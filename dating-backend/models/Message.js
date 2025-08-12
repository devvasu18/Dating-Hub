// backend/models/Message.js
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
sender: { type: String, required: true },      // user id or guest id (string)
  receiver: { type: String, required: true },    // user id or guest id (string)
  text: { type: String, required: true },
  time: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },       // whether receiver read the message
  senderIsGuest: { type: Boolean, default: false }
});

export default mongoose.model('Message', MessageSchema);
