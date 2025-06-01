import User from "../models/user.js";
import Channel from "../models/channel.js";
import Message from "../models/messages.js";

export const createChannel = async (req, res) => {
  try {
    const { userId, name, members } = req.body;
    const admin = await User.findById(userId);
    if (!admin) {
      return res.status(400).json({ message: "Invalid admin user" });
    }

    const validMembers = await User.find({ _id: { $in: members } });
    if (validMembers.length !== members.length) {
      return res.status(400).json({ message: "Invalid members" });
    }

    const newChannel = new Channel({
      name,
      members,
      admin: userId,
    });
    await newChannel.save();
    return res.status(201).json(newChannel);
  } catch (e) {
    return res.status(500).json("Internal Server Error");
  }
};

export const allChannels = async (req, res) => {
  try {
    const { userId } = req.params;
    const channels = await Channel.find({
      $or: [{ admin: userId }, { members: userId }],
    })
      .populate("admin", "username")
      .populate("members", "username");
    return res.status(200).json(channels);
  } catch (e) {}
};

export const allChannelMessages = async (req, res) => {
  try {
    const { channelId } = req.params;

    // Only fetch messages for the given channel, and populate sender details
    const channel = await Channel.findById(channelId).select("messages").populate({
      path: "messages",
      populate: {
        path: "senderId",
        select: "username email _id picturePath",
      },
    });

    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    return res.status(200).json({messages: channel.messages});
  } catch (error) {
    console.error("Error fetching channel messages:", error);
    return res.status(500).json({ error: "Server error while fetching messages" });
  }
};
