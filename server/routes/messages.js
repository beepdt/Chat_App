import express from "express"
import { verifyToken } from "../middleware/auth.js";
import { getMessages } from "../controllers/messages.js";

const router = express.Router();

router.get("/:userid1/:userid2", verifyToken, getMessages);

export default router;