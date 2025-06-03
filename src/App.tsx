import { useEffect, useState } from "react";
import bug from "./assets/iconos/bug.svg";
import dark from "./assets/iconos/dark.svg";
import dragon from "./assets/iconos/dragon.svg";
import electric from "./assets/iconos/electric.svg";
import fairy from "./assets/iconos/fairy.svg";
import fighting from "./assets/iconos/fighting.svg";
import fire from "./assets/iconos/fire.svg";
import flying from "./assets/iconos/flying.svg";
import ghost from "./assets/iconos/ghost.svg";
import grass from "./assets/iconos/grass.svg";
import ground from "./assets/iconos/ground.svg";
import ice from "./assets/iconos/ice.svg";
import normal from "./assets/iconos/normal.svg";
import poison from "./assets/iconos/poison.svg";
import psychic from "./assets/iconos/psychic.svg";
import rock from "./assets/iconos/rock.svg";
import steel from "./assets/iconos/steel.svg";
import water from "./assets/iconos/water.svg";
import pokeball from "./assets/iconos/pokeball.svg";

/**
 *  Iconos de los tipos de Pokémon
 */
type Pokemon = {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default;
      };
    };
  };
  types: PokemonType[];
  stats: Stats[];
};

type Stats = {
  base_stat: number;
  stat: {
    name: StatName;
  };
};

type StatName =
  | "hp"
  | "attack"
  | "defense"
  | "special-attack"
  | "special-defense"
  | "speed";

type PokemonType = {
  type: {
    name: string;
  };
};

type Icons = {
  [key: string]: string;
};

const ICON_POKEMON_TYPE: Icons = {
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

type Results = {
  url: string;
};
type APIResponseURL = {
  results: Results[];
};

type Region = {
  name: RegionName;
  regionStart: number;
  regionEnd: number;
};
type RegionName =
  | "kanto"
  | "johto"
  | "hoenn"
  | "sinnoh"
  | "unova"
  | "kalos"
  | "alola"
  | "galar"
  | "paldea";

const REGIONS: Region[] = [
  {
    name: "kanto",
    regionStart: 0,
    regionEnd: 151,
  },
  {
    name: "johto",
    regionStart: 151,
    regionEnd: 251,
  },
  {
    name: "hoenn",
    regionStart: 251,
    regionEnd: 386,
  },
  {
    name: "sinnoh",
    regionStart: 386,
    regionEnd: 494,
  },
  {
    name: "unova",
    regionStart: 494,
    regionEnd: 649,
  },
  {
    name: "kalos",
    regionStart: 649,
    regionEnd: 721,
  },
  {
    name: "alola",
    regionStart: 721,
    regionEnd: 809,
  },
  {
    name: "galar",
    regionStart: 809,
    regionEnd: 905,
  },
  {
    name: "paldea",
    regionStart: 905,
    regionEnd: 1025,
  },
];

export const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFilteringByText, setIsFilteringByText] = useState<boolean>(false);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [searchingText, setSearchingTest] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<RegionName>("kanto");
  const [isShowingRegions, setIsShowingRegions] = useState<boolean>(false);
  const [isShowingSortBy, setIsShowingSortBy] = useState<boolean>(false);
  const [sortedBy, setSortedBy] = useState<StatName | "default">("default");

  const getSelectedRegion = (regionName: RegionName) => {
    const region = REGIONS.find((region) => region.name === regionName);
    if (region) {
      return region;
    }
    return REGIONS.find((region) => region.name === "kanto")!;
  };

  const pokeAPICall = async (urlOffset: number, urlLimit: number) => {
    const { results }: APIResponseURL = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${urlOffset}&limit=${urlLimit}`,
    ).then((res) => res.json());

    const pokeResponse = await Promise.all(
      results.map(
        async ({ url }) => await fetch(url).then((res) => res.json()),
      ),
    );
    return pokeResponse as Pokemon[];
  };

  useEffect(() => {
    /**
     *  Carga de datos de Pokémons y gestión de estado de cargando.
     */
    const getData = async () => {
      setIsLoading(true);
      setIsFilteringByText(true);

      const urlOffset = getSelectedRegion(selectedRegion)?.regionStart;
      const urlLimit =
        getSelectedRegion(selectedRegion)?.regionEnd -
        getSelectedRegion(selectedRegion)?.regionStart;

      const pokeResponse = await pokeAPICall(urlOffset, urlLimit);

      setFilteredPokemon(pokeResponse);
      setAllPokemons(pokeResponse);
      setIsLoading(false);
    };
    getData();
  }, [selectedRegion]);
  /**
   * Filters results based on input query term.
   */
  useEffect(() => {
    setAllPokemons(
      filteredPokemon.filter(
        (res) =>
          res.name.includes(searchingText.toLowerCase()) ||
          !!res.types.find((type) =>
            type.type.name.startsWith(searchingText.toLowerCase()),
          ),
      ),
    );
    setIsFilteringByText(false);
  }, [filteredPokemon[0]?.id, searchingText]);
  /**
   * Sorts results based on selected sorting criteria.
   */

  const sortByStat = (statName: Stats["stat"]["name"]) => {
    setAllPokemons((prev) =>
      [...prev].sort((pokemon1, pokemon2) => {
        const pokemon1Stats =
          pokemon1.stats.find((stats) => stats.stat.name === statName)
            ?.base_stat ?? 0;
        const pokemon2Stats =
          pokemon2.stats.find((stats) => stats.stat.name === statName)
            ?.base_stat ?? 0;

        return pokemon2Stats - pokemon1Stats;
      }),
    );
  };

  useEffect(() => {
    if (sortedBy !== "default") {
      sortByStat("hp");
      if (sortedBy === "attack") {
        sortByStat("attack");
      }
      if (sortedBy === "defense") {
        sortByStat("defense");
      }
      if (sortedBy === "special-attack") {
        sortByStat("special-attack");
      }
      if (sortedBy === "special-defense") {
        sortByStat("special-defense");
      }
      if (sortedBy === "speed") {
        sortByStat("speed");
      }
    }
    if (sortedBy === "default") {
      setAllPokemons((prev) =>
        [...prev].sort((a, b) => {
          return a.id - b.id;
        }),
      );
    }
  }, [allPokemons[0]?.id, sortedBy]);

  return (
    <div className="layout">
      <header className="header">
        <img src={pokeball} alt="" className="header__logo" />
        <p className="header__title">Pokédex</p>
      </header>

      {/* Searcher */}
      <main className="container">
        <section className="search">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="search__icon"
          >
            <path
              d="M3 10C3 10.9193 3.18106 11.8295 3.53284 12.6788C3.88463 13.5281 4.40024 14.2997 5.05025 14.9497C5.70026 15.5998 6.47194 16.1154 7.32122 16.4672C8.1705 16.8189 9.08075 17 10 17C10.9193 17 11.8295 16.8189 12.6788 16.4672C13.5281 16.1154 14.2997 15.5998 14.9497 14.9497C15.5998 14.2997 16.1154 13.5281 16.4672 12.6788C16.8189 11.8295 17 10.9193 17 10C17 9.08075 16.8189 8.1705 16.4672 7.32122C16.1154 6.47194 15.5998 5.70026 14.9497 5.05025C14.2997 4.40024 13.5281 3.88463 12.6788 3.53284C11.8295 3.18106 10.9193 3 10 3C9.08075 3 8.1705 3.18106 7.32122 3.53284C6.47194 3.88463 5.70026 4.40024 5.05025 5.05025C4.40024 5.70026 3.88463 6.47194 3.53284 7.32122C3.18106 8.1705 3 9.08075 3 10Z"
              stroke="var(--color-neutral-400)"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 21L15 15"
              stroke="var(--color-neutral-400)"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search a Pokémon..."
            value={searchingText}
            onChange={(e) => setSearchingTest(e.target.value)}
          />
          {/* Shows regions */}
          <div className="dropdown">
            <button
              role="combobox"
              aria-haspopup="listbox"
              aria-controls="reg-list"
              aria-label="Select reg"
              aria-expanded={isShowingRegions}
              className={`dropdown__button ${isShowingRegions ? "active" : ""}`}
              onClick={() =>
                setIsShowingRegions((prev) => {
                  if (isShowingSortBy) {
                    setIsShowingSortBy(false);
                  }
                  return !prev;
                })
              }
            >
              {selectedRegion}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.33337 5.99999L8.00004 3.33333L10.6667 5.99999"
                  stroke="var(--color-neutral-600)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.6667 10L8.00004 12.6667L5.33337 10"
                  stroke="var(--color-neutral-600)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <ol
              role="listbox"
              id="reg-list"
              hidden={!isShowingRegions}
              className={`dropdown__list ${!isShowingRegions ? "hide" : ""}`}
            >
              {REGIONS.map((region) => (
                <li
                  key={region.name}
                  role="radio"
                  aria-checked={selectedRegion === region.name}
                  tabIndex={0}
                  className={selectedRegion === region.name ? "active" : ""}
                  onClick={() => {
                    setSelectedRegion(region.name);
                    setIsShowingRegions(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSelectedRegion(region.name);
                      setIsShowingRegions(false);
                    }
                  }}
                >
                  {region.name}
                </li>
              ))}
            </ol>
          </div>

          <button
            role="combobox"
            aria-haspopup="listbox"
            aria-controls="sort-list"
            aria-label="Sort by"
            aria-expanded={isShowingSortBy}
            className="sort__button"
            onClick={() =>
              setIsShowingSortBy((prev) => {
                if (isShowingRegions) setIsShowingRegions(false);
                return !prev;
              })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={
                isShowingSortBy
                  ? "var(--color-accent)"
                  : "var(--color-neutral-700)"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l9 0" />
              <path d="M4 12l7 0" />
              <path d="M4 18l7 0" />
              <path d="M15 15l3 3l3 -3" />
              <path d="M18 6l0 12" />
            </svg>
          </button>

          {/* Muestra el menú de ordenación */}
          {isShowingSortBy && (
            <article className="sort__wrapper">
              <h3 className="sort__title">Sort by</h3>
              <div className="sort__items" role="listbox" id="sort-list">
                <span
                  role="radio"
                  aria-label="Default"
                  tabIndex={0}
                  className={`sort__pill ${
                    sortedBy === "default" ? "active" : ""
                  }`}
                  aria-checked={sortedBy === "default"}
                  onClick={() => {
                    setSortedBy("default");
                    setIsShowingSortBy(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortedBy("default");
                      setIsShowingSortBy(false);
                    }
                  }}
                >
                  {" "}
                  Default
                </span>
                <span
                  role="radio"
                  aria-label="Health points"
                  tabIndex={0}
                  className={`sort__pill ${sortedBy === "hp" ? "active" : ""}`}
                  aria-checked={sortedBy === "hp"}
                  onClick={() => {
                    setSortedBy("hp");
                    setIsShowingSortBy(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortedBy("hp");
                      setIsShowingSortBy(false);
                    }
                  }}
                >
                  {" "}
                  Hp
                </span>
                <span
                  role="radio"
                  aria-label="Attack"
                  tabIndex={0}
                  className={`sort__pill ${
                    sortedBy === "attack" ? "active" : ""
                  }`}
                  aria-checked={sortedBy === "attack"}
                  onClick={() => {
                    setSortedBy("attack");
                    setIsShowingSortBy(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortedBy("attack");
                      setIsShowingSortBy(false);
                    }
                  }}
                >
                  {" "}
                  At
                </span>
                <span
                  role="radio"
                  aria-label="Defense"
                  tabIndex={0}
                  className={`sort__pill ${
                    sortedBy === "defense" ? "active" : ""
                  }`}
                  aria-checked={sortedBy === "defense"}
                  onClick={() => {
                    setSortedBy("defense");
                    setIsShowingSortBy(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortedBy("defense");
                      setIsShowingSortBy(false);
                    }
                  }}
                >
                  Df
                </span>
                <span
                  role="radio"
                  aria-label="Special attack"
                  tabIndex={0}
                  className={`sort__pill ${
                    sortedBy === "special-attack" ? "active" : ""
                  }`}
                  aria-checked={sortedBy === "special-attack"}
                  onClick={() => {
                    setSortedBy("special-attack");
                    setIsShowingSortBy(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortedBy("special-attack");
                      setIsShowingSortBy(false);
                    }
                  }}
                >
                  {" "}
                  SpA
                </span>
                <span
                  role="radio"
                  aria-label="Special defense"
                  tabIndex={0}
                  className={`sort__pill ${
                    sortedBy === "special-defense" ? "active" : ""
                  }`}
                  aria-checked={sortedBy === "special-defense"}
                  onClick={() => {
                    setSortedBy("special-defense");
                    setIsShowingSortBy(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortedBy("special-defense");
                      setIsShowingSortBy(false);
                    }
                  }}
                >
                  SpD
                </span>
                <span
                  role="radio"
                  aria-label="Speed"
                  tabIndex={0}
                  className={`sort__pill ${
                    sortedBy === "speed" ? "active" : ""
                  }`}
                  aria-checked={sortedBy === "speed"}
                  onClick={() => {
                    setSortedBy("speed");
                    setIsShowingSortBy(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortedBy("speed");
                      setIsShowingSortBy(false);
                    }
                  }}
                >
                  {" "}
                  Spd
                </span>
              </div>
            </article>
          )}
        </section>

        {/* Muestra cartas cargando */}
        <section>
          {(isLoading || isFilteringByText) && (
            <div className="grid" aria-hidden="true">
              {Array.from({ length: 6 }, (_, index) => {
                return (
                  <article
                    data-testid="skeleton"
                    key={`placeholder-card-${index}`}
                    className="card card-placeholder"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2M12,4C7.92,4 4.55,7.05 4.06,11H8.13C8.57,9.27 10.14,8 12,8C13.86,8 15.43,9.27 15.87,11H19.94C19.45,7.05 16.08,4 12,4M12,20C16.08,20 19.45,16.95 19.94,13H15.87C15.43,14.73 13.86,16 12,16C10.14,16 8.57,14.73 8.13,13H4.06C4.55,16.95 7.92,20 12,20M12,10C10.9,10 10,10.9 10,12C10,13.1 10.9,14 12,14C13.1,14 14,13.1 14,12C14,10.9 13.1,10 12,10Z" />
                    </svg>
                  </article>
                );
              })}
            </div>
          )}
          {/* Prints cards */}
          {!isFilteringByText && !isLoading && allPokemons.length > 0 && (
            <ul className="grid" data-testid="lista">
              {allPokemons.map((res) => {
                const customStyles: any = {
                  "--color-type": `var(--color-${res.types[0].type.name}`,
                };

                return (
                  <li key={`pokemon-card-${res.id}`}>
                    <article className="card" style={customStyles}>
                      <header className="card__head">
                        <div className="card__tag">
                          <p>#{res.id.toString().padStart(3, "0")}</p>
                        </div>
                        <div className="card__tag">
                          <img
                            src={ICON_POKEMON_TYPE[res.types[0].type.name]}
                            className="card__type"
                            alt={`${res.types[0].type.name} primary type`}
                          />
                          {res.types[1] && (
                            <img
                              src={ICON_POKEMON_TYPE[res.types[1].type.name]}
                              className="card__type"
                              alt={`${res.types[1].type.name} secondary type`}
                            />
                          )}
                        </div>
                      </header>
                      <img
                        className="card__avatar"
                        src={
                          res.sprites.other["official-artwork"].front_default
                        }
                        loading="lazy"
                        alt={`${res.name} artwork`}
                      />
                      <section className="card__content">
                        <h3 className="card__title">{res.name}</h3>
                        <ul aria-description="Stats resume">
                          <li className="card__stat" aria-label="Health points">
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                Hp
                              </p>
                              <p>{res.stats[0].base_stat}</p>
                            </div>
                            <progress
                              value={res.stats[0].base_stat}
                              max="255"
                            ></progress>
                          </li>
                          <li className="card__stat" aria-label="Attack">
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                At
                              </p>
                              <p>{res.stats[1].base_stat}</p>
                            </div>
                            <progress
                              value={res.stats[1].base_stat}
                              max="255"
                            ></progress>
                          </li>
                          <li className="card__stat" aria-label="Defense">
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                Df
                              </p>
                              <p>{res.stats[2].base_stat}</p>
                            </div>
                            <progress
                              value={res.stats[2].base_stat}
                              max="255"
                            ></progress>
                          </li>
                          <li
                            className="card__stat"
                            aria-label="Special attack"
                          >
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                SpA
                              </p>
                              <p>{res.stats[3].base_stat}</p>
                            </div>
                            <progress
                              value={res.stats[3].base_stat}
                              max="255"
                            ></progress>
                          </li>
                          <li
                            className="card__stat"
                            aria-label="Special defense"
                          >
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                SpD
                              </p>
                              <p>{res.stats[4].base_stat}</p>
                            </div>
                            <progress
                              value={res.stats[4].base_stat}
                              max="255"
                            ></progress>
                          </li>
                          <li className="card__stat" aria-label="Speed">
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                Spd
                              </p>
                              <p>{res.stats[5].base_stat}</p>
                            </div>
                            <progress
                              value={res.stats[5].base_stat}
                              max="255"
                            ></progress>
                          </li>
                        </ul>
                      </section>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
        {!isLoading && allPokemons.length === 0 && (
          <p className="noresults">No results for "{searchingText}"</p>
        )}
      </main>

      <footer className="footer">
        <p>
          ©{new Date().getFullYear()} Pokémon. ©1995 -{" "}
          {new Date().getFullYear()} Nintendo/Creatures Inc./GAME FREAK inc. TM,
          ®Nintendo.
        </p>
      </footer>
    </div>
  );
};
