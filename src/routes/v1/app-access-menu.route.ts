import express from 'express';
import appAccessMenuController from '@controllers/app-access-menu.controller';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get(`/by-role/:roleId/category-modul/:categoryModulId`, expressAsyncHandler(appAccessMenuController.getByRoleId));

router.post('/create-bulk', expressAsyncHandler(appAccessMenuController.createBulk));

export default router;
