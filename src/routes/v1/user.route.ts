import express from 'express';
import userController from '@controllers/user.controller';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', expressAsyncHandler(userController.get));
router.get('/:id', expressAsyncHandler(userController.getById));

router.post('/', expressAsyncHandler(userController.create));

router.put('/:id', expressAsyncHandler(userController.update));
router.put('/:id/change-password', expressAsyncHandler(userController.changePassword));

router.delete('/:id', expressAsyncHandler(userController.delete));

export default router;
