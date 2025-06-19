import { Pokemon } from "./Pokemon";


export interface PokemonRepository {
  listPokemon(urlOffset: number, urlLimit: number): Promise<Pokemon[]>;
}

