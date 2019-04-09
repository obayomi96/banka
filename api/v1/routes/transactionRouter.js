import express from 'express';
import transactionController from '../controllers/transactionController';
import authenticateUser from '../middlewares/authenticateUser';

const router = express.Router();

router.post('/:accountNumber/credit', authenticateUser.verifyStaff, transactionController.creditAccount);

router.post('/:accountNumber/debit', authenticateUser.verifyStaff, transactionController.debitAccount);

export default router;
