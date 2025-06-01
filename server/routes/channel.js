import express from "express"
import { verifyToken } from "../middleware/auth.js";
import { allChannelMessages, allChannels, createChannel } from "../controllers/channel.js";

const router = express.Router();

router.post("/createChannel",verifyToken,createChannel);
router.get("/allChannels/:userId",verifyToken,allChannels);
router.get("/allMessages/:channelId",verifyToken,allChannelMessages);

export default router;