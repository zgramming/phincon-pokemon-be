import express from 'express';
import masterCategoryController from '@controllers/master-category.controller';

const router = express.Router();

router.get('/', masterCategoryController.get);
router.get('/:id', masterCategoryController.getById);

router.post('/', masterCategoryController.create);

router.put('/:id', masterCategoryController.update);

router.delete('/:id', masterCategoryController.delete);

export default router;
