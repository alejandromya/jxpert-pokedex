import { FavPokemonRepository } from "../dominio/FavPokemonRepository";
import { Pokemon } from "../dominio/Pokemon";

export class LocalHostPokemonRepository implements FavPokemonRepository {
  getFavPokemonFromLocalhost = (name: string) => {
    const favPokemon = localStorage.getItem(name);
    if (favPokemon === null) return [];
    return JSON.parse(favPokemon);
  };
  saveFavPokemonToLocalhost = (name: string, pokemons: Pokemon[]) => {
    const favoritePokemonsToString = JSON.stringify(pokemons);
    localStorage.setItem(name, favoritePokemonsToString);
  };
}
