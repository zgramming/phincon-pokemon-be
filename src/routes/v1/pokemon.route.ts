import express from 'express';
import pokemonController from '@controllers/pokemon.controller';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.post('/pokemon/catch/:name', expressAsyncHandler(pokemonController.catchPokemon));
router.post('/pokemon/release/:name', expressAsyncHandler(pokemonController.releasePokemon));
router.post('/pokemon/rename/:name', expressAsyncHandler(pokemonController.renamePokemon));

export default router;
