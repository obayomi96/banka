import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

// User sign up route
router.post('/signup', userController.signUp);

// User sign in route
router.post('/signin', userController.signIn);

export default router;
