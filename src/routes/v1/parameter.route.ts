import express from 'express';
import parameterController from '@controllers/parameter.controller';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', expressAsyncHandler(parameterController.get));
router.get('/:id', expressAsyncHandler(parameterController.getById));

router.post('/', expressAsyncHandler(parameterController.create));

router.put('/:id', expressAsyncHandler(parameterController.update));

router.delete('/:id', expressAsyncHandler(parameterController.delete));

export default router;
