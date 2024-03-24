import express from 'express';
import masterCategoryController from '@controllers/master-category.controller';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', expressAsyncHandler(masterCategoryController.get));
router.get('/:id', expressAsyncHandler(masterCategoryController.getById));

router.post('/', expressAsyncHandler(masterCategoryController.create));

router.put('/:id', expressAsyncHandler(masterCategoryController.update));

router.delete('/:id', expressAsyncHandler(masterCategoryController.delete));

export default router;
