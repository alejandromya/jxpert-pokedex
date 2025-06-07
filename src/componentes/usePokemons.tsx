/*import { useState, useEffect } from "react";

type Pokemon = {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default;
      };
    };
  };
  types: PokemonType[];
  stats: Stats[];
};

type Stats = {
  base_stat: number;
  stat: {
    name: StatName;
  };
};

type StatName =
  | "hp"
  | "attack"
  | "defense"
  | "special-attack"
  | "special-defense"
  | "speed"
  | "default";

type PokemonType = {
  type: {
    name: string;
  };
};

type Results = {
  url: string;
};
type APIResponseURL = {
  results: Results[];
};

export function useFetchPokemon(urlOffset: number, urlLimit: number) {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);

    const pokeAPICall = async (urlOffset: number, urlLimit: number) => {
      const { results }: APIResponseURL = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${urlOffset}&limit=${urlLimit}`,
      ).then((res) => res.json());

      const pokeResponse: Pokemon[] = await Promise.all(
        results.map(
          async ({ url }) => await fetch(url).then((res) => res.json()),
        ),
      );
      return { pokeResponse, isLoading };
    };
  });

}
*/
