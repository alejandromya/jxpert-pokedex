import { describe, expect, test, vi } from "vitest";
import { App } from "../App";
import { render, screen } from "@testing-library/react";
import pokemonList from "./pokemonListMock.json";

describe("App Component", () => {
  test("debería verse el nombre del bulbasaur cuando se cargan los datos", async () => {
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
      json: async () => pokemonList,
    });

    render(<App />);

    const bulbasaur = await screen.findByText("bulbasaur");
    expect(bulbasaur).toBeInTheDocument();
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
      json: async () => pokemonList,
    });

    render(<App />);

    const snorlax = await screen.findByText("snorlax");
    expect(snorlax).toBeInTheDocument();
  });
});
