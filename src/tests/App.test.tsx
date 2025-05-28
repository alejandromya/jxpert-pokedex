import { describe, expect, test, vi } from "vitest";
import { App } from "../App";
import { render, screen } from "@testing-library/react";
import pokemonMockBulbasaur from "./__fixtures__/pokemonMockBulbasaur.json";
import pokemonMockSnorlax from "./__fixtures__/pokemonMockSnorlax.json";
import pokemonMockServine from "./__fixtures__/pokemonMockServine.json";

import userEvent from "@testing-library/user-event";

let call: number = 0;

const generarMockFetch = async () => {
  call++;
  const returnedValueUrl = {
    json: async () => ({
      results: [
        {
          url: "url",
        },
      ],
    }),
  };

  const returnedValueBulbasaur = {
    json: async () => pokemonMockBulbasaur,
  };

  const returnedValueServine = {
    json: async () => pokemonMockServine,
  };

  if (call === 1 || call === 3) {
    return returnedValueUrl;
  } else if (call === 2) {
    return returnedValueBulbasaur;
  } else if (call === 4) {
    return returnedValueServine;
  }
};

describe("App Component", () => {
  test("deberian asegurarse las llamadas a la API", async () => {
    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;

    mockFetch.mockImplementation(generarMockFetch);

    render(<App />);

    const bulbasaur = await screen.findByText("bulbasaur");
    expect(bulbasaur).toBeInTheDocument();
  });
});

test("debería verse el nombre del snorlax cuando se cargan los datos", async () => {
  const mockFetch = vi.fn();
  globalThis.fetch = mockFetch;

  const secondFetch = mockFetch.mockResolvedValueOnce({
    json: async () => ({
      results: [
        {
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        },
      ],
    }),
  });

  secondFetch.mockResolvedValueOnce({
    json: async () => pokemonMockSnorlax,
  });

  render(<App />);

  const snorlax = await screen.findByText("snorlax");
  expect(snorlax).toBeInTheDocument();
});

test("debería mostrarse todos los datus de Bulbasaur", async () => {
  const mockFetch = vi.fn();
  globalThis.fetch = mockFetch;

  const secondFetch = mockFetch.mockResolvedValueOnce({
    json: async () => ({
      results: [
        {
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        },
      ],
    }),
  });

  secondFetch.mockResolvedValueOnce({
    json: async () => pokemonMockBulbasaur,
  });

  render(<App />);

  const bulbasaurName = await screen.findByText("bulbasaur");
  expect(bulbasaurName).toBeInTheDocument();
  const bulbasaurHp = await screen.findByText("Hp");
  expect(bulbasaurHp).toBeInTheDocument();
  const bulbasaurAt = await screen.findByText("At");
  expect(bulbasaurAt).toBeInTheDocument();
  const bulbasaurDf = await screen.findByText("Df");
  expect(bulbasaurDf).toBeInTheDocument();
  const bulbasaurSpA = await screen.findByText("SpA");
  expect(bulbasaurSpA).toBeInTheDocument();
  const bulbasaurSpD = await screen.findByText("SpD");
  expect(bulbasaurSpD).toBeInTheDocument();
  const bulbasaurSpd = await screen.findByText("Spd");
  expect(bulbasaurSpd).toBeInTheDocument();

  const bulbasaurArtwork = await screen.findByAltText("bulbasaur artwork");
  expect(bulbasaurArtwork).toBeInTheDocument();
});

test.only("cuando pulsamos la combobutton se abre el listado", async () => {
  const mockFetch = vi.fn();
  globalThis.fetch = mockFetch;

  mockFetch.mockImplementation(generarMockFetch);

  render(<App />);

  const bulbasaur = await screen.findByText("bulbasaur");
  expect(bulbasaur).toBeInTheDocument();
  const combobox = await screen.findByRole("combobox", {
    name: "Select reg",
  });

  await userEvent.click(combobox);
  const region = screen.getByRole("radio", {
    name: "unova",
  });
  await userEvent.click(region);

  const servine = await screen.findByText("servine");

  expect(servine).toBeInTheDocument();
});
