import authController from '@controllers/auth.controller';
import { validateToken } from '@middlewares/validate-token.middleware';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/accessible-content', validateToken, expressAsyncHandler(authController.accessibleContent));

router.post('/login', expressAsyncHandler(authController.login));

export default router;
