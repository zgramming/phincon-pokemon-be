import PokemonService from '@services/pokemon.service';
import { Request, Response } from 'express';

class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  catchPokemon = async (req: Request, res: Response) => {
    const { name } = req.params;

    const result = this.pokemonService.catchPokemon(name);

    res
      .json({
        error: false,
        message: result.message,
        data: result.caught,
      })
      .status(200);
  };

  releasePokemon = async (req: Request, res: Response) => {
    const { name } = req.params;

    const result = this.pokemonService.releasePokemon(name);

    res
      .json({
        error: false,
        message: result.message,
        data: result.released,
      })
      .status(200);
  };

  renamePokemon = async (req: Request, res: Response) => {
    const { name } = req.params;
    const { sequenceFibonacci } = req.body;

    const result = this.pokemonService.renamePokemon(name, sequenceFibonacci);

    res
      .json({
        error: false,
        message: result.message,
        data: {
          oldName: name,
          newName: result.newName,
        },
      })
      .status(200);
  };
}

export default new PokemonController(new PokemonService());
