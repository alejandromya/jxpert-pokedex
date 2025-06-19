import { PokemonRepository } from "../dominio/PokemonRepository";
import { Pokemon } from "../dominio/Pokemon";
import { SortByStatPokemonRepository } from "../dominio/PokemonSortByStatRepository";

export class SortByStatPokemon implements SortByStatPokemonRepository {
/*     sortByStat = (pokemons:Pokemon, statName?: Pokemon["stats"])=>{
         if (statName === "default") {
      const pokemonsOrdered = [...pokemons].sort((pokemon1, pokemon2) => {
        return pokemon1.id - pokemon2.id;
      });
      return pokemonsOrdered;
    }

    const pokemonsOrdered = [...pokemons].sort((pokemon1, pokemon2) => {
      const pokemon1Stats = pokemon1.stats[statName!];
      const pokemon2Stats = pokemon2.stats[statName!];
      return pokemon2Stats - pokemon1Stats;
    });
    return pokemonsOrdered;
    } */
}