import jwt from 'jsonwebtoken'; // Import jsonwebtoken for creating JWT tokens

export const verifyToken = (req, res, next) => {

    // Get the token from the request headers
    try {
        let token = req.header("Authorization");

        // Check if the token exists
        if (!token) {
            // Respond with a 403 status code and error message if the token is missing
            return res.status(403).json({ error: "Access denied" });
        }

        // Remove the "Bearer " prefix from the token
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }

        // Verify the token with the secret key
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Set the user in the request object
        req.user = verified;
        next();
        
    } catch (error) {
        // Handle any errors and respond with a 500 status code and error message
        res.status(500).json({ error: error.message });
    }
}
