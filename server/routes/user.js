import express from 'express';
import { 
    getUser,
    getUserFriends,
    addRemoveFriend,
} from '../controllers/user.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/*Read a user*/
router.get('/:id', verifyToken, getUser);
router.get('/friends/:id', verifyToken, getUserFriends);

/*UPDATE */
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;