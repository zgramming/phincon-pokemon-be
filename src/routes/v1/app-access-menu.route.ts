import express from 'express';
import appAccessMenuController from '@controllers/app-access-menu.controller';
const router = express.Router();

router.post('/create-bulk', appAccessMenuController.createBulk);

export default router;
