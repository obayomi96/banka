import express from 'express';
import accountController from '../controllers/accountController';
import authenticateUser from '../middlewares/authenticateUser';
import inputValidator from '../middlewares/validator';

const router = express.Router();

router.post('/createAccount', inputValidator.createAccount, authenticateUser.verifyUser, accountController.createAccount);

router.patch('/:accountNumber', inputValidator.accountStatus, authenticateUser.verifyAdmin, accountController.accountStatus);

router.delete('/:accountNumber', authenticateUser.verifyAdmin, accountController.deleteAccount);

export default router;
