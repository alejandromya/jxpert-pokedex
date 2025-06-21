import { Pokemon } from "./Pokemon";

export interface FavPokemonRepository {
  getFavPokemonFromLocalhost(name: string): Pokemon[];
  saveFavPokemonToLocalhost(name: string, pokemon: Pokemon[]): void;
}
