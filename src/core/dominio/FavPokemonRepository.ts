import { Pokemon } from "./Pokemon";

export interface PokemonRepository {
  getFavPokemon(name: string): Pokemon[];
  saveFavPokemon(name: string, pokemon: Pokemon[]): void;
}
