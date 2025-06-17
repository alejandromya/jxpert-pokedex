import { PokemonRepository } from "../dominio/PokemonRepository";
import { APIResponseURL, Pokemon } from "../../types/types";

export class PokeAPIPokemonRepository implements PokemonRepository {
  listPokemon = async (urlOffset: number, urlLimit: number) => {
    const { results }: APIResponseURL = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${urlOffset}&limit=${urlLimit}`,
    ).then((res) => res.json());

    const pokeResponse: Pokemon[] = await Promise.all(
      results.map(
        async ({ url }) => await fetch(url).then((res) => res.json()),
      ),
    );
    return pokeResponse;
  };
}
