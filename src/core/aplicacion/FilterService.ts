import { Pokemon } from "../dominio/Pokemon";

export const filterPokemon = (
  filteredPokemon: Pokemon[],
  searchingText: string,
) => {
  const filteredPoks = filteredPokemon.filter(
    (res) =>
      res.name.includes(searchingText.toLowerCase()) ||
      !!res.types.find((type) =>
        type.type_name.startsWith(searchingText.toLowerCase()),
      ),
  );
  return filteredPoks;
};
