import { useState, useEffect } from "react";

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

const REGIONS = [
  { name: "kanto", regionStart: 0, regionEnd: 151 },
  { name: "johto", regionStart: 151, regionEnd: 251 },
  { name: "hoenn", regionStart: 251, regionEnd: 386 },
  { name: "sinnoh", regionStart: 386, regionEnd: 494 },
  { name: "unova", regionStart: 494, regionEnd: 649 },
  { name: "kalos", regionStart: 649, regionEnd: 721 },
  { name: "alola", regionStart: 721, regionEnd: 809 },
  { name: "galar", regionStart: 809, regionEnd: 905 },
  { name: "paldea", regionStart: 905, regionEnd: 1025 },
] as const;

type RegionName = (typeof REGIONS)[number]["name"];

export const usePokemons = () => {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedRegion, setSelectedRegion] = useState<RegionName>("kanto");

  const getSelectedRegion = (regionName: RegionName) => {
    const region = REGIONS.find((region) => region.name === regionName);
    if (region) {
      return region;
    }
    return REGIONS.find((region) => region.name === "kanto")!;
  };

  const pokeAPICall = async (urlOffset: number, urlLimit: number) => {
    const { results }: APIResponseURL = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${urlOffset}&limit=${urlLimit}`,
    ).then((res) => res.json());

    const pokemonResponse: Pokemon[] = await Promise.all(
      results.map(
        async ({ url }) => await fetch(url).then((res) => res.json()),
      ),
    );
    return pokemonResponse;
  };

  useEffect(() => {
    setIsLoading(true);
    /**
     *  Carga de datos de Pokémons y gestión de estado de cargando.
     */
    const getPokemonAPIData = async () => {
      setIsLoading(true);

      const urlOffset = getSelectedRegion(selectedRegion)?.regionStart;
      const urlLimit =
        getSelectedRegion(selectedRegion)?.regionEnd -
        getSelectedRegion(selectedRegion)?.regionStart;

      const pokemonResponse = await pokeAPICall(urlOffset, urlLimit);

      setAllPokemons(pokemonResponse);
      setIsLoading(false);
      console.log(allPokemons);
      console.log(isLoading);
      console.log(setSelectedRegion);
    };
    getPokemonAPIData();
  }, [selectedRegion]);
};
