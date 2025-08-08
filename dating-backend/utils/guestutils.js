import Message  from "../models/Message";   
exports.migrateGuestMessages = async (guestId, realUserId) => {
  await Message.updateMany(
    { sender: guestId },
    { $set: { sender: realUserId } }
  );

  await Message.updateMany(
    { receiver: guestId },
    { $set: { receiver: realUserId } }
  );
};      

