import express from 'express';
import masterDataController from '@controllers/master-data.controller';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', expressAsyncHandler(masterDataController.get));
router.get('/:id', expressAsyncHandler(masterDataController.getById));

router.post('/', expressAsyncHandler(masterDataController.create));

router.put('/:id', expressAsyncHandler(masterDataController.update));

router.delete('/:id', expressAsyncHandler(masterDataController.delete));

export default router;
