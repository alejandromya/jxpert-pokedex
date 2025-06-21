import { PokemonRepository } from "../dominio/PokemonRepository";

export class PokemonService {
  constructor(private pokemonRepository: PokemonRepository) {}
  getPokemonByRegion = (urlOffset: number, urlLimit: number) => {
    return this.pokemonRepository.listPokemon(urlOffset, urlLimit);
  };
}
