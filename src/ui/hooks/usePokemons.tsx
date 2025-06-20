import { useState, useEffect } from "react";
import { RegionName, StatName } from "../../types/types";
import { PokeAPIPokemonRepository } from "../../core/infraestructura/fetchPokemon";
import { PokemonService } from "../../core/aplicacion/PokemonService";
import { getSelectedRegion } from "../../core/aplicacion/RegionService";
import { sortByStat } from "../../core/aplicacion/SortByStatService";
import { filterPokemon } from "../../core/aplicacion/FilterService";
import { Pokemon } from "../../core/dominio/Pokemon";

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
  const [favoritePokemons, setFavoritePokemons] = useState<Pokemon[]>([]);
  const [favoriteList, setFavoriteList] = useState<Boolean>(false);

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
    favoritePokemons,
    favoriteList,
    setFavoritePokemons,
    setSearchingText,
    setSelectedRegion,
    setSortedBy,
    setFavoriteList,
  };
};

export default usePokemons;
