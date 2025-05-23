import { describe, expect, test, vi } from "vitest";
import { App } from "../App";
import { render, screen } from "@testing-library/react";
import bulbasaurDetail from "./bulbasaurMock.json";

describe("App Component", () => {
  test("debería verse el nombre del pokemon cuando se cargan los datos", async () => {
    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;

    const secondFetch = mockFetch.mockResolvedValueOnce({
      json: async () => ({
        results: [
          {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/",
          },
        ],
      }),
    });

    secondFetch.mockResolvedValueOnce({
      json: async () => bulbasaurDetail,
    });

    render(<App />);

    const nombre = await screen.findByText("bulbasaur");
    expect(nombre).toBeInTheDocument();
  });
});
