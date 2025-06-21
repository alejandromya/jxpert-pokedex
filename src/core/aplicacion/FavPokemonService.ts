import { FavPokemonRepository } from "../dominio/FavPokemonRepository";
import { Pokemon } from "../dominio/Pokemon";

export class PokemonLocalhostService {
  constructor(private favPokemonRepository: FavPokemonRepository) {}

  getFavPokemon = (name: string) => {
    const pokemonFavoritos =
      this.favPokemonRepository.getFavPokemonFromLocalhost(name);
    return pokemonFavoritos;
  };

  saveFavPokemon = (name: string, pokemons: Pokemon[]) => {
    this.favPokemonRepository.saveFavPokemonToLocalhost(name, pokemons);
  };
}
