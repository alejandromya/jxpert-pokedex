import { describe, expect, test, vi } from "vitest";
import { App } from "../App";
import { render, screen } from "@testing-library/react";
import pokemonList from "./pokemonListMock.json";
import userEvent from "@testing-library/user-event";

describe("App Component", () => {
  test("deberian asegurarse las llamadas a la API", async () => {
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
      json: async () => pokemonList[0],
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
    render(<App />);

    const combobox = await screen.findByRole("combobox", {
      name: "Select reg",
    });
    userEvent.click(combobox);

    // expect(combobox).toHaveVtoalue("honen");
  });
});
