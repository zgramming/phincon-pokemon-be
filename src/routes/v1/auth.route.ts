import authController from '@controllers/auth.controller';
import express from 'express';

const router = express.Router();

router.get('/accessible-content/:roleId', authController.accessibleContent);

router.post('/login', authController.login);

export default router;
