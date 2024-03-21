import express from 'express';
import appCategoryModulController from '@controllers/app-category-modul.controller';

const router = express.Router();

router.get('/', appCategoryModulController.get);
router.get('/:id', appCategoryModulController.getById);

router.post('/', appCategoryModulController.create);

router.put('/:id', appCategoryModulController.update);

router.delete('/:id', appCategoryModulController.delete);

export default router;
