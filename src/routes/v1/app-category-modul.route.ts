import express from 'express';
import appCategoryModulController from '@controllers/app-category-modul.controller';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', expressAsyncHandler(appCategoryModulController.get));
router.get('/:id', expressAsyncHandler(appCategoryModulController.getById));

router.post('/', expressAsyncHandler(appCategoryModulController.create));

router.put('/:id', expressAsyncHandler(appCategoryModulController.update));

router.delete('/:id', expressAsyncHandler(appCategoryModulController.delete));

export default router;
