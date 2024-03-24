import express from 'express';
import appAccessModulController from '@controllers/app-access-modul.controller';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/by-role/:roleId', expressAsyncHandler(appAccessModulController.getByRoleId));

router.post('/create-bulk', expressAsyncHandler(appAccessModulController.createBulk));

export default router;
