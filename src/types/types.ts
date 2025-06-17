import bug from "../assets/iconos/bug.svg";
import dark from "../assets/iconos/dark.svg";
import dragon from "../assets/iconos/dragon.svg";
import electric from "../assets/iconos/electric.svg";
import fairy from "../assets/iconos/fairy.svg";
import fighting from "../assets/iconos/fighting.svg";
import fire from "../assets/iconos/fire.svg";
import flying from "../assets/iconos/flying.svg";
import ghost from "../assets/iconos/ghost.svg";
import grass from "../assets/iconos/grass.svg";
import ground from "../assets/iconos/ground.svg";
import ice from "../assets/iconos/ice.svg";
import normal from "../assets/iconos/normal.svg";
import poison from "../assets/iconos/poison.svg";
import psychic from "../assets/iconos/psychic.svg";
import rock from "../assets/iconos/rock.svg";
import steel from "../assets/iconos/steel.svg";
import water from "../assets/iconos/water.svg";

export type PokemonDTO = {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default;
      };
    };
  };
  types: PokemonTypeDTO[];
  stats: StatsDTO[];
};

export type Pokemon = {
  id: number;
  name: string;
  image: string;
  types: PokemonType[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };
};

export type StatsDTO = {
  base_stat: number;
  stat: {
    name: StatName;
  };
};

export type Stats = {
  base_stat: number;
  stat_name: StatName;
};

export type StatName =
  | "hp"
  | "attack"
  | "defense"
  | "special-attack"
  | "special-defense"
  | "speed"
  | "default";

export type PokemonTypeDTO = {
  type: {
    name: string;
  };
};

export type PokemonType = {
  type_name: string;
};

export type Icons = {
  [key: string]: string;
};

export const ICON_POKEMON_TYPE: Icons = {
  bug,
  dark,
  dragon,
  electric,
  fairy,
  fighting,
  fire,
  flying,
  ghost,
  grass,
  ground,
  ice,
  normal,
  poison,
  psychic,
  rock,
  steel,
  water,
};

export type Results = {
  url: string;
};
export type APIResponseURL = {
  results: Results[];
};

export const REGIONS = [
  { name: "kanto", regionStart: 0, regionEnd: 151 },
  { name: "johto", regionStart: 151, regionEnd: 251 },
  { name: "hoenn", regionStart: 251, regionEnd: 386 },
  { name: "sinnoh", regionStart: 386, regionEnd: 494 },
  { name: "unova", regionStart: 494, regionEnd: 649 },
  { name: "kalos", regionStart: 649, regionEnd: 721 },
  { name: "alola", regionStart: 721, regionEnd: 809 },
  { name: "galar", regionStart: 809, regionEnd: 905 },
  { name: "paldea", regionStart: 905, regionEnd: 1025 },
] as const;

export type RegionName = (typeof REGIONS)[number]["name"];
