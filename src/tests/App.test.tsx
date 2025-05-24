import { describe, expect, test, vi } from "vitest";
import { App } from "../App";
import { render, screen } from "@testing-library/react";
import pokemonList from "./pokemonListMock.json";

describe("App Component", () => {
  test.only("debería verse el nombre del bulbasaur cuando se cargan los datos", async () => {
    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;

    const secondFetch = mockFetch.mockResolvedValueOnce({
      json: async () => ({
        results: [
          {
            url: "pokemonUrl",
          },
        ],
      }),
    });

    secondFetch.mockResolvedValueOnce({
      json: async () => pokemonList[0],
    });

    render(<App />);

    const bulbasaur = await screen.findByText("bulbasaur");
    expect(bulbasaur).toBeInTheDocument();
    expect(mockFetch).toHaveBeenNthCalledWith(
      1,
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151",
    );
    expect(mockFetch).toHaveBeenNthCalledWith(2, "pokemonUrl");
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
      json: async () => pokemonList[1],
    });

    render(<App />);

    const snorlax = await screen.findByText("snorlax");
    expect(snorlax).toBeInTheDocument();
  });

  test("debería verse la imagen de bulbasaur cuando se cargan los datos", async () => {
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
      json: async () => pokemonList[0],
    });

    render(<App />);

    const bulbasaurArtwork = await screen.findByAltText("bulbasaur artwork");
    expect(bulbasaurArtwork).toBeInTheDocument();
  });
});
