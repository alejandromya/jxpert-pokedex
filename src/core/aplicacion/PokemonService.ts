import { RegionName } from "../../types/types";
import { PokemonRepository } from "../dominio/PokemonRepository";

export class PokemonService {
  constructor(private pokemonRepository: PokemonRepository) {}
  getPokemonByRegion = (region: RegionName) => {
    return this.pokemonRepository.listPokemon(region);
  };
}
