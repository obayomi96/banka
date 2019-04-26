import express from 'express';
import authenticateUser from '../middlewares/authenticateUser';
import userController from '../controllers/userController';
import inputValidator from '../middlewares/validator';

const router = express.Router();

router.get('/:userEmail/accounts', inputValidator.emailParams, authenticateUser.verifyUser, userController.getAllAccountByUser);

export default router;
