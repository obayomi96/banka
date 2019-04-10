import express from 'express';
import userController from '../controllers/userController';
import inputValidator from '../middlewares/validator';

const router = express.Router();

// User sign up route
router.post('/signup', inputValidator, userController.signUp);

// User sign in route
router.post('/signin', userController.signIn);

export default router;
