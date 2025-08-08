// app.js (ESM version)
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import messageRoutes from './routes/messageRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import fixuser from "./routes/fix-user.js";
import Message from './models/Message.js';
import authRoutes from './routes/authRoutes.js'; 
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // frontend URL
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/messages', messageRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/users", userRoutes);
app.use('/api', userRoutes);
app.use("/api/admin", fixuser);

// Track connected users
const onlineUsers = new Map();

// Socket.IO Logic
io.on('connection', (socket) => {
  console.log('🔌 New connection:', socket.id);

  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log('✅ User online:', userId);
  });

  socket.on('send-msg', async (data) => {
    const { senderId, receiverId, message } = data;

    try {
      await Message.create({
        sender: senderId,
        receiver: receiverId,
        message,
      });

      const sendToSocketId = onlineUsers.get(receiverId);
      if (sendToSocketId) {
        io.to(sendToSocketId).emit('msg-receive', {
          from: senderId,
          message,
        });
      }
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
    // Optionally remove from onlineUsers if needed
  });
});

// Root test route
app.get('/', (req, res) => {
  res.send('Dating backend with Socket.IO is live!');
});

// MongoDB connect + start server
const PORT = process.env.PORT || 5000;

try {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('✅ Connected to MongoDB');

  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
} catch (error) {
  console.error('❌ Error connecting to MongoDB:', error.message);
}
