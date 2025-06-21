import { FavPokemonRepository } from "../dominio/FavPokemonRepository";
import { Pokemon } from "../dominio/Pokemon";

export class LocalHostPokemonRepository implements FavPokemonRepository {
  getFavPokemonFromLocalhost = () => {
    const favPokemon = localStorage.getItem("savedFavPokemons");
    if (favPokemon === null) return [];
    return JSON.parse(favPokemon);
  };
  saveFavPokemonToLocalhost = (pokemons: Pokemon[]) => {
    const favoritePokemonsToString = JSON.stringify(pokemons);
    localStorage.setItem("savedFavPokemons", favoritePokemonsToString);
  };
}
