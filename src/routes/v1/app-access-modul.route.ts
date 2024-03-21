import express from 'express';
import appAccessModulController from '@controllers/app-access-modul.controller';

const router = express.Router();

router.post('/create-bulk', appAccessModulController.createBulk);

export default router;
