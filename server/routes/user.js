import express from 'express';
import { 
    getUser,
    getUserFriends,
    addRemoveFriend,
    searchUserByUsername,
} from '../controllers/user.js';
import { verifyToken } from '../middleware/auth.js';
import { verify } from 'crypto';

const router = express.Router();

/*SEARCH */
router.get('/search', verifyToken, searchUserByUsername);

/*Read a user*/
router.get('/:id', verifyToken, getUser);
router.get('/friends/:id', verifyToken, getUserFriends);

/*UPDATE */
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);



export default router;