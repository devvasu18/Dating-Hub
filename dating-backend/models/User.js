import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
  id: { type: String }, // you can remove if redundant
  bio: { type: String },
  email: { type: String, unique: true, sparse: true },
  password: { type: String },
  gender: { type: String },
  age: { type: Number },
  images: [String],
  location: { type: String },
  lastActive: { type: Date },
  likedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  token: { type: String },
  isAdmin: { type: Boolean, default: false },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  passes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  // Guest-specific fields
  isGuest: { type: Boolean, default: false },
  guestId: { type: String, unique: true, sparse: true } // store IDs like "guest_1754892702722"
}, { timestamps: true });

export default mongoose.model('User', userSchema);

