let onlineUsers = new Map();

function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("user-connected", (userId) => {
      onlineUsers.set(userId, socket.id);
    });

    socket.on("send-message", ({ sender, receiver, text }) => {
      const receiverSocket = onlineUsers.get(receiver);
      if (receiverSocket) {
        io.to(receiverSocket).emit("receive-message", {
          sender,
          text,
          timestamp: new Date(),
        });
      }
    });

    socket.on("disconnect", () => {
      for (let [key, value] of onlineUsers.entries()) {
        if (value === socket.id) {
          onlineUsers.delete(key);
          break;
        }
      }
    });
  });
}

module.exports = socketHandler;
