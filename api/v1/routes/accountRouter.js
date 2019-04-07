import express from 'express';
import accountController from '../controllers/accountController';
import authenticateUser from '../middlewares/authenticateUser';

const router = express.Router();

router.post('/createAccount', authenticateUser.verifyUser, accountController.createAccount);

router.patch('/:accountNumber', authenticateUser.verifyAdmin, accountController.accountStatus);

router.delete('/:accountNumber', authenticateUser.verifyAdmin, accountController.deleteAccount);

export default router;
