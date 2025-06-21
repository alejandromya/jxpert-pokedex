import { PokemonRepository } from "../dominio/PokemonRepository";
import { Pokemon } from "../dominio/Pokemon";
import { RegionName, REGIONS } from "../../types/types";

export class PokeAPIPokemonRepository implements PokemonRepository {
  listPokemon = async (regionName: RegionName) => {
    let region = REGIONS.find((region) => region.name === regionName);
    let urlOffset: number;
    let urlLimit: number;
    if (region) {
      urlOffset = region.regionStart;
      urlLimit = region.regionEnd - region.regionStart;
    } else {
      urlOffset = REGIONS.find(
        (region) => region.name === "kanto",
      )!.regionStart;
      urlLimit = REGIONS.find((region) => region.name === "kanto")!.regionEnd;
    }
    console.log(region?.regionStart, region?.regionEnd, urlOffset, urlLimit);
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
    return newPokeResponse;
  };
}

export type PokemonDTO = {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default;
      };
    };
  };
  types: PokemonTypeDTO[];
  stats: StatsDTO[];
};

export type StatsDTO = {
  base_stat: number;
  stat: {
    name: StatNameDTO;
  };
};

export type StatNameDTO =
  | "hp"
  | "attack"
  | "defense"
  | "special-attack"
  | "special-defense"
  | "speed"
  | "default";

export type PokemonTypeDTO = {
  type: {
    name: string;
  };
};
export type Results = {
  url: string;
};
export type APIResponseURL = {
  results: Results[];
};
