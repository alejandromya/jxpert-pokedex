import { RegionName } from "../../types/types";
import { Pokemon } from "./Pokemon";

export interface PokemonRepository {
  listPokemon(region: RegionName): Promise<Pokemon[]>;
}
