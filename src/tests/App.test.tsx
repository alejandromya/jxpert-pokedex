import { describe, expect, test, vi } from "vitest";
import { App } from "../App";
import { render, screen } from "@testing-library/react";
import pokemonMockBulbasaur from "./__fixtures__/pokemonMockBulbasaur.json";
import pokemonMockServine from "./__fixtures__/pokemonMockServine.json";

import userEvent from "@testing-library/user-event";

const getGenerateMockFetch = () => {
  let callNumber: number = 0;

  return {
    fetchMock: async () => {
      callNumber++;
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

      if (callNumber === 1 || callNumber === 3) {
        return returnedValueUrl;
      } else if (callNumber === 2) {
        return returnedValueBulbasaur;
      } else if (callNumber === 4) {
        return returnedValueServine;
      }
    },
  };
};
describe("App Component", () => {
  test("debería mostrarse todos los datus de Bulbasaur", async () => {
    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;
    const migenerador = getGenerateMockFetch();
    mockFetch.mockImplementation(migenerador.fetchMock);

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

  test("cuando pulsamos la combobutton se abre el listado", async () => {
    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;

    mockFetch.mockImplementation(getGenerateMockFetch().fetchMock);
    render(<App />);

    const bulbasaurName = await screen.findByText("bulbasaur");
    expect(bulbasaurName).toBeInTheDocument();
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

  test.only("cuando cargamos la pagina hay un skeleton", async () => {
    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;

    mockFetch.mockImplementation(getGenerateMockFetch().fetchMock);

    render(<App />);
  });
});
