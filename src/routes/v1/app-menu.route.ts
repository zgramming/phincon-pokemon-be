import express from 'express';
import appMenuController from '@controllers/app-menu.controller';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', expressAsyncHandler(appMenuController.get));
router.get('/:id', expressAsyncHandler(appMenuController.getById));

router.post('/', expressAsyncHandler(appMenuController.create));

router.put('/:id', expressAsyncHandler(appMenuController.update));

router.delete('/:id', expressAsyncHandler(appMenuController.delete));

export default router;
