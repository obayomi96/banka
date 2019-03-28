import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

// Home page route default
router.get('/', (req, res) => {
  res.status(200).json({
    msg: 'Welcome to banka 1.0',
  });
});

// User sign up route
router.post('/signup', userController.signUp);

// router.post('/signup', (req, res) => {
//   res.status(200).json({
//     msg: 'sign up route',
//   });
// });

export default router;
