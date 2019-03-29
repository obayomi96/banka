import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

// User sign up route
router.post('/signup', userController.signUp);

export default router;
