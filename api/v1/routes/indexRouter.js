import express from 'express';
import userRouter from './userRouter';
import accountRouter from './accountRouter';

const router = express.Router();

// Home page route default
router.get('/', (req, res) => {
  res.status(200).json({
    msg: 'Welcome to banka 1.0',
  });
});

router.use('/auth', userRouter);
router.use('/accounts', accountRouter);

export default router;
