import { Pokemon } from "./Pokemon";

export interface SortByStatPokemonRepository {
  sortByStat(pokemons: Pokemon[], statName?: Pokemon["stats"]): Pokemon[];
}
