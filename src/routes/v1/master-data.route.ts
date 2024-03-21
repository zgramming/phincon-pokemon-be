import express from 'express';
import masterDataController from '@controllers/master-data.controller';

const router = express.Router();

router.get('/', masterDataController.get);
router.get('/:id', masterDataController.getById);

router.post('/', masterDataController.create);

router.put('/:id', masterDataController.update);

router.delete('/:id', masterDataController.delete);

export default router;
