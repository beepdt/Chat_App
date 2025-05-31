import express from 'express';
import { 
    getUser,
    getUserFriends,
    addRemoveFriend,
    searchUserByUsername,
    getAllUser,
} from '../controllers/user.js';
import { verifyToken } from '../middleware/auth.js';
import { verify } from 'crypto';

const router = express.Router();

/*SEARCH */
router.get('/search', verifyToken, searchUserByUsername);
router.get('/all/:id', verifyToken, getAllUser);

/*Read a user*/
router.get('/:id', verifyToken, getUser);
router.get('/friends/:id', verifyToken, getUserFriends);

/*UPDATE */
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);



export default router;