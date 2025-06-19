import { Pokemon, Stats } from "../../types/types";

export const sortByStat = (pokemons: Pokemon[], statName?: Stats["stat_name"]) => {
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
  };