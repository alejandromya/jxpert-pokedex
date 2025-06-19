import { useState, useEffect } from "react";
import { Pokemon, RegionName, REGIONS, StatName, Stats } from "../types/types";
import { PokeAPIPokemonRepository } from "../core/infraestructura/fetchPokemon";
import { PokemonService } from "../core/aplicacion/PokemonService";

export const usePokemons = () => {
  // hacemos cositas
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFilteringByText, setIsFilteringByText] = useState<boolean>(false);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [searchingText, setSearchingText] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<RegionName>("kanto");
  const [sortedBy, setSortedBy] = useState<StatName | "default" | undefined>(
    "default",
  );

  const getSelectedRegion = (regionName: RegionName) => {
    const region = REGIONS.find((region) => region.name === regionName);
    if (region) {
      return region;
    }
    return REGIONS.find((region) => region.name === "kanto")!;
  };

  useEffect(() => {
    /**
     *  Carga de datos de Pokémons y gestión de estado de cargando.
     */
    const getPokemonAPIData = async () => {
      setIsLoading(true);
      setIsFilteringByText(true);

      const urlOffset = getSelectedRegion(selectedRegion)?.regionStart;
      const urlLimit =
        getSelectedRegion(selectedRegion)?.regionEnd -
        getSelectedRegion(selectedRegion)?.regionStart;

      const pokeResponse = await new PokemonService(
        new PokeAPIPokemonRepository(),
      ).getPokemon(urlOffset, urlLimit);

      setFilteredPokemon(pokeResponse);
      setAllPokemons(pokeResponse);
      setIsLoading(false);
    };
    getPokemonAPIData();
  }, [selectedRegion]);
  /**
   * Filters results based on input query term.
   */

  const filterPokemon = () => {
    const filteredPoks = filteredPokemon.filter(
      (res) =>
        res.name.includes(searchingText.toLowerCase()) ||
        !!res.types.find((type) =>
          type.type_name.startsWith(searchingText.toLowerCase()),
        ),
    );
    return filteredPoks;
  };

  useEffect(() => {
    setAllPokemons(filterPokemon());

    setIsFilteringByText(false);
  }, [filteredPokemon[0]?.id, searchingText]);
  /**
   * Sorts results based on selected sorting criteria.
   */

  const sortByStat = (pokemons: Pokemon[], statName?: Stats["stat_name"]) => {
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
    console.log(pokemonsOrdered);
    return pokemonsOrdered;
  };

  useEffect(() => {
    const pokemons: Pokemon[] = sortByStat(allPokemons, sortedBy);
    setAllPokemons(pokemons);
  }, [allPokemons[0]?.id, sortedBy]);

  // devolvemos cositas
  return {
    allPokemons,
    isLoading,
    isFilteringByText,
    selectedRegion,
    searchingText,
    sortedBy,
    setSearchingText,
    setSelectedRegion,
    setSortedBy,
  };
};

export default usePokemons;
