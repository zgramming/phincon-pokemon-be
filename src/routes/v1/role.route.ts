import express from 'express';
import roleController from '@controllers/role.controller';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', expressAsyncHandler(roleController.get));
router.get('/:id', expressAsyncHandler(roleController.getById));

router.post('/', expressAsyncHandler(roleController.create));
router.put('/:id', expressAsyncHandler(roleController.update));

router.delete('/:id', expressAsyncHandler(roleController.delete));

export default router;
