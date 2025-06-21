import { Pokemon } from "./Pokemon";

export interface FavPokemonRepository {
  getFavPokemonFromLocalhost(): Pokemon[];
  saveFavPokemonToLocalhost(pokemon: Pokemon[]): void;
}
