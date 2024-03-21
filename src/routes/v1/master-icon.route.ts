import express from 'express';
import masterIconController from '@controllers/master-icon.controller';

const router = express.Router();

router.get('/', masterIconController.get);
router.get('/:id', masterIconController.getById);

router.post('/', masterIconController.create);

router.put('/:id', masterIconController.update);

router.delete('/:id', masterIconController.delete);

export default router;
