import { PokemonRepository } from "../dominio/PokemonRepository";

export class PokemonService {
  constructor(private pokemonRepository: PokemonRepository) {}
  getPokemon = async (urlOffset: number, urlLimit: number) => {
    const pokeResponse = await this.pokemonRepository.listPokemon(
      urlOffset,
      urlLimit,
    );
    return pokeResponse;
  };
}
