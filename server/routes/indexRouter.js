import express from 'express';
import authRouter from './authRouter';
import accountRouter from './accountRouter';
import transactionRouter from './transactionRouter';
import userRouter from './userRouter';
import docsRouter from './docsRouter';

const router = express.Router();

// Home page route default
router.get('/', (req, res) => {
  res.status(200).json({
    msg: 'Welcome to banka 1.0',
  });
});

router.use('/docs', docsRouter);
router.use('/auth', authRouter);
router.use('/accounts', accountRouter);
router.use('/transactions', transactionRouter);
router.use('/users', userRouter);

export default router;
