import express from 'express';
import parameterController from '@controllers/parameter.controller';

const router = express.Router();

router.get('/', parameterController.get);
router.get('/:id', parameterController.getById);

router.post('/', parameterController.create);

router.put('/:id', parameterController.update);

router.delete('/:id', parameterController.delete);

export default router;
