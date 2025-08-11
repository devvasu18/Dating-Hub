// backend/socketHandler.js (ESM)
import Message from './models/Message.js';

export default function setupSocket(io) {
  const onlineUsers = new Map();

  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('user-connected', (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log('User connected (map):', userId, '->', socket.id);
    });

    socket.on('send-message', async (msg) => {
      try {
        // msg should be: { sender, receiver, text, timestamp }
        console.log('Socket send-message received:', msg);

        const sender = msg.sender;
        const receiver = msg.receiver;
        const text = msg.text;
        const time = msg.timestamp ? new Date(msg.timestamp) : new Date();

        // Save message to DB (recommended)
        const senderIsGuest = typeof sender === 'string' && sender.startsWith('guest_');
        const messageDoc = new Message({ sender, receiver, text, time, senderIsGuest });
        await messageDoc.save().catch(err => console.error('DB save error:', err));

        // Emit to receiver if online
        const receiverSocketId = onlineUsers.get(receiver);
        if (receiverSocketId) {
          // Emit same shape that client expects
          io.to(receiverSocketId).emit('receive-message', {
            sender,
            receiver,
            text,
            time,
          });
        }
      } catch (err) {
        console.error('Error in socket send-message handler:', err);
      }
    });

    socket.on('disconnect', () => {
      // remove disconnected socket from map
      for (const [userId, sId] of onlineUsers.entries()) {
        if (sId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      console.log('Socket disconnected:', socket.id);
    });
  });
}
