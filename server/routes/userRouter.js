import express from 'express';
import userController from '../controllers/userController';
import inputValidator from '../middlewares/validator';

const router = express.Router();

// User sign up route
router.post('/signup', inputValidator.userSignup, userController.signUp);

// User sign in route
router.post('/signin', inputValidator.userSignin, userController.signIn);

export default router;
