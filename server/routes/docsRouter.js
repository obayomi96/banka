import express from 'express';
import apiDoc from '../controllers/docs';

const router = express.Router();

router.get('/', apiDoc.docs);

export default router;
