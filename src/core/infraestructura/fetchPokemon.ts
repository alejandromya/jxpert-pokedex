import { PokemonRepository } from "../dominio/PokemonRepository";
import {
  APIResponseURL,
  PokemonDTO,
  Pokemon,
  StatsDTO,
  PokemonTypeDTO,
} from "../../types/types";

export class PokeAPIPokemonRepository implements PokemonRepository {
  listPokemon = async (urlOffset: number, urlLimit: number) => {
    const { results }: APIResponseURL = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${urlOffset}&limit=${urlLimit}`,
    ).then((res) => res.json());

    const pokeResponse: PokemonDTO[] = await Promise.all(
      results.map(
        async ({ url }) => await fetch(url).then((res) => res.json()),
      ),
    );

    const newPokeResponse: Pokemon[] = pokeResponse.map(
      (pokemon: PokemonDTO) => ({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other["official-artwork"].front_default,
        types: pokemon.types.map((typeMap: PokemonTypeDTO) => ({
          type_name: typeMap.type.name,
        })),
        stats: pokemon.stats.map((statsMap: StatsDTO) => ({
          base_stat: statsMap.base_stat,
          stat_name: statsMap.stat.name,
        })),
      }),
    );

    // const newPokeResponse: Pokemon[] = pokeResponse.map((pokemon) => {
    //   const statsObj = {
    //     hp: 0,
    //     attack: 0,
    //     defense: 0,
    //     special_attack: 0,
    //     special_defense: 0,
    //     speed: 0,
    //   };

    //   for (const stat of pokemon.stats) {
    //     const statName = stat.stat.name;
    //     const baseStat = stat.base_stat;

    //     if (statName === "hp") statsObj.hp = baseStat;
    //     else if (statName === "attack") statsObj.attack = baseStat;
    //     else if (statName === "defense") statsObj.defense = baseStat;
    //     else if (statName === "special-attack")
    //       statsObj.special_attack = baseStat;
    //     else if (statName === "special-defense")
    //       statsObj.special_defense = baseStat;
    //     else if (statName === "speed") statsObj.speed = baseStat;
    //   }

    //   return {
    //     id: pokemon.id,
    //     name: pokemon.name,
    //     image: pokemon.sprites.other["official-artwork"].front_default,
    //     types: pokemon.types.map((typeMap: PokemonTypeDTO) => ({
    //       type_name: typeMap.type.name,
    //     })),
    //     stats: statsObj,
    //   };
    // });
    return newPokeResponse;
  };
}
