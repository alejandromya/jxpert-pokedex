import { PokemonRepository } from "../dominio/PokemonRepository";
import {
  APIResponseURL,
  PokemonDTO,
  Pokemon,
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

    const newPokeResponse: Pokemon[] = pokeResponse.map((pokemon) => {
      const statsObj = {
        hp: 0,
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0,
      };

      for (const stat of pokemon.stats) {
        const statName = stat.stat.name;
        const baseStat = stat.base_stat;

        if (statName === "hp") statsObj.hp = baseStat;
        else if (statName === "attack") statsObj.attack = baseStat;
        else if (statName === "defense") statsObj.defense = baseStat;
        else if (statName === "special-attack")
          statsObj.specialAttack = baseStat;
        else if (statName === "special-defense")
          statsObj.specialDefense = baseStat;
        else if (statName === "speed") statsObj.speed = baseStat;
      }

      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other["official-artwork"].front_default,
        types: pokemon.types.map((typeMap: PokemonTypeDTO) => ({
          type_name: typeMap.type.name,
        })),
        stats: statsObj,
      };
    });
    console.log(newPokeResponse);
    return newPokeResponse;
  };
}
