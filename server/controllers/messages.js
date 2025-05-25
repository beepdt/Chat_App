import Message from "../models/messages.js";
import User from "../models/user.js";

export const getMessages = async (req, res) => {
    try {
        const { userid1, userid2 } = req.params; // Get the username from query parameters
        
        // Find users whose username matches the query (case-insensitive)
        if(!userid1 || !userid2){
           return  res.status(400).json({error:"Both id required"})
        }

        const messages = await Message.find({
            $or: [
                {senderId: userid1, receiverId: userid2},
                {senderId: userid2, receiverId: userid1}
            ]
        }).sort({createdAt : 1});
        

        // Respond with the formatted user data
       return res.status(200).json(messages);
    } catch (error) {
        // Handle any errors and respond with a 500 status code and error message
       return res.status(500).json({ error: error.message });
    }
};