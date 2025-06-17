import { PokemonRepository } from "../dominio/PokemonRepository";

export class PokemonService {
  constructor(private pokemonRepository: PokemonRepository) {}
  getPokemon = (urlOffset: number, urlLimit: number) => {
    return this.pokemonRepository.listPokemon(urlOffset, urlLimit);
  };
}
