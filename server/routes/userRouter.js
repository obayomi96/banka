import express from 'express';
import authenticateUser from '../middlewares/authenticateUser';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/:userEmail/accounts', authenticateUser.verifyUser, userController.getAllAccountByUser);

export default router;
