export type Pokemon = {
  id: number;
  name: string;
  image: string;
  types: PokemonType[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
};

export type PokemonType = {
  type_name: string;
};
