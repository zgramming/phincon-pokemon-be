import express from 'express';
import pokemonRoute from './v1/pokemon.route';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.use('/pokemon', pokemonRoute);

export default router;
