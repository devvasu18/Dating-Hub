import User from '../models/User.js';

export const discoverUsers = async (req, res) => {
  const { gender } = req.query;
  try {
    const users = await User.find({ gender: { $ne: req.user.gender } }).select('-password');
    res.json(users);
  } catch {
    res.status(500).json({ message: 'Error fetching users' });
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

export const getLikedUsers = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("likedUsers", "name bio image");
    res.json(user.likedUsers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch liked users" });
  }
};
export const unmatchUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(req.user._id);
    const targetUser = await User.findById(userId);

    if (!user || !targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove from likedUsers and matches
    user.likedUsers = user.likedUsers.filter((id) => id.toString() !== userId);
    user.matches = user.matches.filter((id) => id.toString() !== userId);

    targetUser.matches = targetUser.matches.filter((id) => id.toString() !== user._id.toString());

    await user.save();
    await targetUser.save();

    res.json({ message: "User unmatched" });
  } catch (err) {
    res.status(500).json({ message: "Failed to unmatch user" });
  }
};
