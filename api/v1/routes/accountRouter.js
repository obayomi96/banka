import express from 'express';
import accountController from '../controllers/accountController';
import authenticateUser from '../middlewares/authenticateUser';

const router = express.Router();

router.post('/createAccount', authenticateUser.verifyUser, accountController.createAccount);
export default router;
