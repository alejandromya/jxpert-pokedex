import { Pokemon } from "../dominio/Pokemon";

export const saveFavPokemon = (pokemons: Pokemon[]) => {
  const favoritePokemonsToString = JSON.stringify(pokemons);
  localStorage.setItem("savedFavPokemons", favoritePokemonsToString);
};

export const getFavPokemon = () => {
  const favPokemon = localStorage.getItem("savedFavPokemons");
  if (favPokemon === null) return [];
  return JSON.parse(favPokemon);
};
