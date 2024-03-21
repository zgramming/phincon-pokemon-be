import express from 'express';
import appMenuController from '@controllers/app-menu.controller';

const router = express.Router();

router.get('/', appMenuController.get);
router.get('/:id', appMenuController.getById);

router.post('/', appMenuController.create);

router.put('/:id', appMenuController.update);

router.delete('/:id', appMenuController.delete);

export default router;
