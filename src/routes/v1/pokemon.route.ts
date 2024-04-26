import express from 'express';
import pokemonController from '@controllers/pokemon.controller';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.post('/catch/:name', expressAsyncHandler(pokemonController.catchPokemon));
router.put('/rename/:name', expressAsyncHandler(pokemonController.renamePokemon));
router.delete('/release/:name', expressAsyncHandler(pokemonController.releasePokemon));

export default router;
