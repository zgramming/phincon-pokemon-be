interface RenamePokemonDTO {
  newName: string;
  sequenceFibonnaci: number[];
}

class PokemonService {
  constructor() {}

  catchPokemon(name: string) {
    const isCaught = this.randomTrueOrFalse();
    if (isCaught) {
      return {
        caught: true,
        message: `Pokemon ${name} was caught!`,
      };
    } else {
      return {
        caught: false,
        message: `Pokemon ${name} ran away!`,
      };
    }
  }

  releasePokemon(name: string) {
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    const isPrime = this.isPrime(randomNumber);

    if (isPrime) {
      return {
        released: true,
        number: randomNumber,
        message: `Pokemon ${name} was released!`,
      };
    } else {
      return {
        released: false,
        number: randomNumber,
        message: `Pokemon ${name} was not released!`,
      };
    }
  }

  renamePokemon(oldName: string, data: RenamePokemonDTO) {
    const nextSequenceFibonacci = this.getNextSequenceFibonacci(data.sequenceFibonnaci);
    const result = `${data.newName}-${nextSequenceFibonacci}`;

    return {
      currentFibonacci: [...data.sequenceFibonnaci, nextSequenceFibonacci],
      message: `Pokemon ${oldName} was renamed to ${result}`,
      newName: result,
    };
  }

  private getNextSequenceFibonacci(storedFibonacci: number[]) {
    const length = storedFibonacci.length;

    if (length === 0) return 0;

    if (length === 1) return 1;

    return storedFibonacci[length - 1] + storedFibonacci[length - 2];
  }

  private isPrime(number: number) {
    if (number <= 1) return false;

    for (let i = 2; i < number; i++) {
      if (number % i === 0) return false;
    }

    return true;
  }

  private randomTrueOrFalse() {
    const randomNumber = Math.random();
    const isCaught = randomNumber > 0.5;
    return isCaught;
  }
}

export default PokemonService;
