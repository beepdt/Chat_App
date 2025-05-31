import User from '../models/user.js'; // Import User model

//READ//
// Function to get a user by ID
export const getUser = async (req, res) => {
    try {
        // Find the user by the id in the request parameters
        const { id } = req.params;
        const user = await User.findById(id);

        // Respond with the user data  
        res.status(200).json(user);
    }
    catch (error) {
        // Handle any errors and respond with a 500 status code and error message
        res.status(500).json({ error: error.message });
    }
};

// Function to get a user's friends
export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        
        // Find all friends of the user
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        // Format the friends data
        const formatedFriends = friends.map(
            ({_id, username, picturePath}) => {
                return {_id, username, picturePath};
            }
        );
        // Respond with the formatted friends data
        res.status(200).json(formatedFriends);
    }
    catch (error) {
        // Handle any errors and respond with a 500 status code and error message
        res.status(500).json({ error: error.message });
    }
};

//UPDATE//
// Function to add or remove a friend
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        // Check if the friend is already in the user's friends list
        if (user.friends.includes(friendId)) {
            // Remove friend from user's friends list
            user.friends = user.friends.filter((id) => id !== friendId);
            // Remove user from friend's friends list
            friend.friends = friend.friends.filter((id) => id !== id);
        }
        else {
            // Add friend to user's friends list
            user.friends.push(friendId);
            // Add user to friend's friends list
            friend.friends.push(id);
        }
        // Save the updated user and friend data
        await user.save();
        await friend.save();
        
        // Find all friends of the user
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        // Format the friends data
        const formatedFriends = friends.map(
            ({_id, username, picturePath}) => {
                return {_id, username, picturePath};
            }
        );
        // Respond with the formatted friends data
        res.status(200).json(formatedFriends);
    }
    catch (error) {
        // Handle any errors and respond with a 500 status code and error message
        res.status(500).json({ error: error.message });
    }
}

// Function to search for users by username
export const searchUserByUsername = async (req, res) => {
    try {
        const { username } = req.query; // Get the username from query parameters

        // Find users whose username matches the query (case-insensitive)
        const users = await User.find({ 
            username: { $regex: username, $options: 'i' } 
        });

        // Format the user data
        const formattedUsers = users.map(({ _id, username, picturePath }) => {
            return { _id, username, picturePath };
        });

        // Respond with the formatted user data
        res.status(200).json(formattedUsers);
    } catch (error) {
        // Handle any errors and respond with a 500 status code and error message
        res.status(500).json({ error: error.message });
    }
};

export const getAllUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch all users except the one with the given id
        const users = await User.find({ _id: { $ne: id } });
        const formattedUsers= users.map(({ _id, username, picturePath }) => {
            return { _id, username, picturePath };
        });

        res.status(200).json(formattedUsers);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error while fetching users" });
    }
};
