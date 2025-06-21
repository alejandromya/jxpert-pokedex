import { PokemonFavService } from "../aplicacion/FavPokemonService";
import { PokemonService } from "../aplicacion/PokemonService";
import { PokeAPIPokemonRepository } from "../infraestructura/PokeAPIPokemonRepository";
import { LocalHostPokemonRepository } from "../infraestructura/localHostPokemon";

export const pokemonFavService = new PokemonFavService(
  new LocalHostPokemonRepository(),
);

export const pokemonService = new PokemonService(
  new PokeAPIPokemonRepository(),
);
