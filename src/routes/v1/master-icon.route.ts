import express from 'express';
import masterIconController from '@controllers/master-icon.controller';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', expressAsyncHandler(masterIconController.get));
router.get('/:id', expressAsyncHandler(masterIconController.getById));

router.post('/', expressAsyncHandler(masterIconController.create));

router.put('/:id', expressAsyncHandler(masterIconController.update));

router.delete('/:id', expressAsyncHandler(masterIconController.delete));

export default router;
