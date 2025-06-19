import { useState, useEffect } from "react";
import { Pokemon, RegionName, REGIONS, StatName, Stats } from "../types/types";
import { PokeAPIPokemonRepository } from "../core/infraestructura/fetchPokemon";
import { PokemonService } from "../core/aplicacion/PokemonService";
import { getSelectedRegion } from "../core/aplicacion/RegionService";
import { sortByStat } from "../core/aplicacion/SortByStatService";

export const usePokemons = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFilteringByText, setIsFilteringByText] = useState<boolean>(false);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [searchingText, setSearchingText] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<RegionName>("kanto");
  const [sortedBy, setSortedBy] = useState<StatName | "default" | undefined>(
    "default",
  );

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

  const filterPokemon = (filteredPokemon:Pokemon[], searchingText:string) => {
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
    setAllPokemons(filterPokemon(filteredPokemon, searchingText));

    setIsFilteringByText(false);
  }, [filteredPokemon[0]?.id, searchingText]);

  useEffect(() => {
    const pokemons: Pokemon[] = sortByStat(allPokemons, sortedBy);
    setAllPokemons(pokemons);
  }, [allPokemons[0]?.id, sortedBy]);

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
