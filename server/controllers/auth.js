import bcrypt from 'bcrypt'; // Import bcrypt for hashing passwords
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for creating JWT tokens
import User from '../models/user.js'; // Import User model




// Register a new user
export const register = async (req, res) => {
  try {
    // Destructure the request body to get user details
    const { 
        username, 
        email, 
        password,
        picturePath,
        friends,
        gender,
    } = req.body;

    let profilePicture = "";
    //generate otp
    if(gender === "male"){
      profilePicture = "man.png"
    }
    else if(gender === "female"){
      profilePicture= "girl.png"
    }
    else {
      profilePicture = "robot.png"
    }
    //send otp to email
    //sendEmail(email, otp, 'verify');
    //verify otp

    
    // Generate a salt for hashing the password
    const salt = await bcrypt.genSalt();
    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance with the hashed password and other details
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        picturePath: profilePicture,
        friends,

    });
    
    // Save the new user to the database
    const savedUser = await newUser.save();
    // Respond with the saved user data and a 201 status code
    res.status(201).json(savedUser);
  } catch (error) {
    // Handle any errors and respond with a 500 status code and error message
    res.status(500).json({ error: error.message });
  }
};

// Login a user
export const login = async (req, res) => {
  try {

    // Destructure the request body to get user details
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    // Check if the user exists
    if (!user) {
      // Respond with a 404 status code and error message if the user does not exist
      return res.status(404).json({ error: "User does not exist" });
    }

    // Compare the provided password with the user's hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    // Respond with a 400 status code and error message if the password is invalid
   
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Create a JWT token with the user's id and secret key
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    // Respond with the token and a 200 status code
    res.status(200).json({ token, user });
    }
    catch (error) {
    // Handle any errors and respond with a 500 status code and error message
    res.status(500).json({ error: error.message });
    }
}     

    