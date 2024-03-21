import express from 'express';
import appModulController from '@controllers/app-modul.controller';

const router = express.Router();

router.get('/', appModulController.get);
router.get('/:id', appModulController.getById);

router.post('/', appModulController.create);

router.put('/:id', appModulController.update);

router.delete('/:id', appModulController.delete);

export default router;
