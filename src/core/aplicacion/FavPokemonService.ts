import { FavPokemonRepository } from "../dominio/FavPokemonRepository";
import { Pokemon } from "../dominio/Pokemon";

export class PokemonFavService {
  constructor(private favPokemonRepository: FavPokemonRepository) {}

  getFavPokemon = () => {
    const pokemonFavoritos =
      this.favPokemonRepository.getFavPokemonFromLocalhost();
    return pokemonFavoritos;
  };

  saveFavPokemon = (pokemons: Pokemon[]) => {
    this.favPokemonRepository.saveFavPokemonToLocalhost(pokemons);
  };
}
