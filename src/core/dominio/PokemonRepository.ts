import { Pokemon } from "../../types/types";

export interface PokemonRepository {
  listPokemon(urlOffset: number, urlLimit: number): Promise<Pokemon[]>;
}
