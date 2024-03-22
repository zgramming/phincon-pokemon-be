import express from 'express';
import templateDokumenController from '@controllers/template-dokumen.controller';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', expressAsyncHandler(templateDokumenController.get));
router.get('/:id', expressAsyncHandler(templateDokumenController.getById));

router.post('/', expressAsyncHandler(templateDokumenController.create));

router.put('/:id', expressAsyncHandler(templateDokumenController.update));

router.delete('/:id', expressAsyncHandler(templateDokumenController.delete));

export default router;
