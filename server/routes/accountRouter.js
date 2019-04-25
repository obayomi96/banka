import express from 'express';
import accountController from '../controllers/accountController';
import authenticateUser from '../middlewares/authenticateUser';
import inputValidator from '../middlewares/validator';

const router = express.Router();

router.post('/', inputValidator.createAccount, authenticateUser.verifyUser, accountController.createAccount);

router.patch('/:accountNumber', inputValidator.accountStatus, authenticateUser.verifyAdmin, accountController.accountStatus);

router.delete('/:accountNumber', authenticateUser.verifyAdmin, accountController.deleteAccount);

router.get('/:accountNumber', authenticateUser.verifyUser, accountController.viewAccount);

router.get('/', authenticateUser.verifyUser, accountController.viewAllAccounts);

router.get('/:accountNumber/transactions', authenticateUser.verifyUser, accountController.getTransactionHistory);

export default router;
