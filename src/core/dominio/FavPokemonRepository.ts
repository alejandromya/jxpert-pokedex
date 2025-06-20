import { Pokemon } from "./Pokemon";

export interface PokemonRepository {
  listPokemon(id: number): Pokemon[];
}
