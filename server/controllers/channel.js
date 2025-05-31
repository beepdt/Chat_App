import User from "../models/user.js";
import Channel from "../models/channel.js";


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
    const {userId} = req.params;
    const channels =  await Channel.find({
        $or:[
            {admin: userId},
            {members: userId},
        ],
    }).populate("admin", "username").populate("members","username");
    return res.status(200).json(channels);
  } catch (e) {}
};
