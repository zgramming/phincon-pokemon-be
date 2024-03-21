import express from 'express';
import roleController from '@controllers/role.controller';

const router = express.Router();

router.get('/', roleController.get);
router.get('/:id', roleController.getById);

router.post('/', roleController.create);
router.put('/:id', roleController.update);

router.delete('/:id', roleController.delete);

export default router;
