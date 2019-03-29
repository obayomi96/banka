import express from 'express';
import userRouter from './userRouter';

const router = express.Router();

// Home page route default
router.get('/', (req, res) => {
  res.status(200).json({
    msg: 'Welcome to banka 1.0',
  });
});

router.use('/auth', userRouter);

export default router;
