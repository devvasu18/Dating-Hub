export const saveGuestMessage = (userId, message) => {
  const chat = JSON.parse(localStorage.getItem('guestChat')) || {};
  if (!chat[userId]) chat[userId] = [];
  chat[userId].push(message);
  localStorage.setItem('guestChat', JSON.stringify(chat));
};

export const getGuestMessages = (userId) => {
  const chat = JSON.parse(localStorage.getItem('guestChat')) || {};
  return chat[userId] || [];
};