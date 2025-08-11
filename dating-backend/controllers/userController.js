import User from '../models/User.js';

export const discoverUsers = async (req, res) => {
  try {
    const currentUserId = req.user?._id;
    const users = await User.find(currentUserId ? { _id: { $ne: currentUserId } } : {})
                            .select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};
export const likeUser = async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user._id;
console.log("Current User ID:", req.user._id);
console.log("Liked User ID:", req.params.userId);
  try {
    const likedUser = await User.findById(userId);
    const user = await User.findById(currentUserId);

    if (!likedUser || !user)
      return res.status(404).json({ message: "User not found" });

    if (!user.likedUsers.includes(userId)) {
      user.likedUsers.push(userId);

      if (likedUser.likedUsers.includes(currentUserId)) {
        user.matches.push(userId);
        likedUser.matches.push(currentUserId);
        await likedUser.save();
      }

      await user.save();
    }

    res.json({ message: "User liked", likedUser });
  } catch (err) {
    console.error("Like error:", err);
    console.error(err); // 👈 check terminal log
    res.status(500).json({ message: "Error liking user" });
  }
};

export const createGuestUser = async (req, res) => {
  try {
    const { guestId, guestName } = req.body;

    let guest = await User.findOne({ username: guestId });

    if (!guest) {
      guest = new User({
        username: guestId,
        name: guestName || "Guest",
        isGuest: true
      });
      await guest.save();
    }

    res.status(201).json(guest);
  } catch (err) {
    console.error("Error creating guest:", err);
    res.status(500).json({ error: "Failed to create guest user" });
  }
};
