import express from 'express';
import appModulController from '@controllers/app-modul.controller';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', expressAsyncHandler(appModulController.get));
router.get('/:id', expressAsyncHandler(appModulController.getById));

router.post('/', expressAsyncHandler(appModulController.create));

router.put('/:id', expressAsyncHandler(appModulController.update));

router.delete('/:id', expressAsyncHandler(appModulController.delete));

export default router;
