import express from 'express';
import userController from '@controllers/user.controller';

const router = express.Router();

router.get('/', userController.get);
router.get('/:id', userController.getById);

router.post('/', userController.create);
router.put('/:id', userController.update);

router.delete('/:id', userController.delete);

export default router;
