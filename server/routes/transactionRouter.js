import express from 'express';
import transactionController from '../controllers/transactionController';
import authenticateUser from '../middlewares/authenticateUser';
import inputValidator from '../middlewares/validator';

const router = express.Router();

router.post('/:accountNumber/credit', inputValidator.creditAccount, authenticateUser.verifyStaff, transactionController.creditAccount);

router.post('/:accountNumber/debit', authenticateUser.verifyStaff, inputValidator.debitAccount, transactionController.debitAccount);

router.get('/:transactionId', authenticateUser.verifyUser, transactionController.getSpecificTransaction);

export default router;
