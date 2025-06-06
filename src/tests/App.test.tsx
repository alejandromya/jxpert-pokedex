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
    fetchMock2: async () => {
      callNumber++;
      const returnedValueUrl = {
        json: async () => ({
          results: [
            {
              url: "urlBulbasur",
            },
            {
              url: "urlServine",
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

      if (callNumber === 1) {
        return returnedValueUrl;
      } else if (callNumber === 2) {
        return returnedValueBulbasaur;
      } else if (callNumber === 3) {
        return returnedValueServine;
      }
    },
  };
};

describe("App Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("cuando cargamos la pagina hay un skeleton", async () => {
    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;
    const migenerador = getGenerateMockFetch();
    mockFetch.mockImplementation(migenerador.fetchMock);
    render(<App />);
    const skeleton = screen.getAllByTestId("skeleton");
    expect(skeleton).toHaveLength(6);
  });

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

  test("cuando busquemos un pokemon que busque similitudes de texto", async () => {
    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;

    mockFetch.mockImplementation(getGenerateMockFetch().fetchMock);
    render(<App />);

    const textbox = await screen.findByRole("textbox");

    await userEvent.type(textbox, "bulb");
    const bulbasaurName = await screen.findByText("bulbasaur");

    expect(bulbasaurName).toBeInTheDocument();
  });

  test("comparamos el sort by de HP dos pokemons", async () => {
    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;

    mockFetch.mockImplementation(getGenerateMockFetch().fetchMock2);

    render(<App />);

    const listBeforeOrder = await screen.findByTestId("lista");
    const firstElementBefore = listBeforeOrder.children[0];
    const secondElementBefore = listBeforeOrder.children[1];

    expect(firstElementBefore).toHaveTextContent("bulbasaur");
    expect(secondElementBefore).toHaveTextContent("servine");

    const combobox = await screen.findByRole("combobox", {
      name: "Sort by",
    });
    await userEvent.click(combobox);

    const radio = await screen.findByRole("radio", {
      name: "Health points",
    });
    await userEvent.click(radio);

    //bulbasur 45HP servine 60HP

    const listAfterOrder = await screen.findByTestId("lista");
    const firstElementAfter = listAfterOrder.children[0];
    const secondElementAfter = listAfterOrder.children[1];

    expect(firstElementAfter).toHaveTextContent("servine");
    expect(secondElementAfter).toHaveTextContent("bulbasaur");
  });

  test("comparamos el sort by de Attack dos pokemons", async () => {
    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;

    mockFetch.mockImplementation(getGenerateMockFetch().fetchMock2);

    render(<App />);

    const listBeforeOrder = await screen.findByTestId("lista");
    const firstElementBefore = listBeforeOrder.children[0];
    const secondElementBefore = listBeforeOrder.children[1];

    expect(firstElementBefore).toHaveTextContent("bulbasaur");
    expect(secondElementBefore).toHaveTextContent("servine");

    const combobox = await screen.findByRole("combobox", {
      name: "Sort by",
    });
    await userEvent.click(combobox);

    const radio = await screen.findByRole("radio", {
      name: "Attack",
    });
    await userEvent.click(radio);

    //bulbasur 49AT servine 60

    const listAfterOrder = await screen.findByTestId("lista");
    const firstElementAfter = listAfterOrder.children[0];
    const secondElementAfter = listAfterOrder.children[1];

    expect(firstElementAfter).toHaveTextContent("servine");
    expect(secondElementAfter).toHaveTextContent("bulbasaur");
  });

  test("comparamos el sort by de Defense dos pokemons", async () => {
    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;

    mockFetch.mockImplementation(getGenerateMockFetch().fetchMock2);

    render(<App />);

    const listBeforeOrder = await screen.findByTestId("lista");
    const firstElementBefore = listBeforeOrder.children[0];
    const secondElementBefore = listBeforeOrder.children[1];

    expect(firstElementBefore).toHaveTextContent("bulbasaur");
    expect(secondElementBefore).toHaveTextContent("servine");

    const combobox = await screen.findByRole("combobox", {
      name: "Sort by",
    });
    await userEvent.click(combobox);

    const radio = await screen.findByRole("radio", {
      name: "Defense",
    });
    await userEvent.click(radio);

    //bulbasur 49DF servine 75

    const listAfterOrder = await screen.findByTestId("lista");
    const firstElementAfter = listAfterOrder.children[0];
    const secondElementAfter = listAfterOrder.children[1];

    expect(firstElementAfter).toHaveTextContent("servine");
    expect(secondElementAfter).toHaveTextContent("bulbasaur");
  });

  test("comparamos el sort by de Special Attack dos pokemons", async () => {
    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;

    mockFetch.mockImplementation(getGenerateMockFetch().fetchMock2);

    render(<App />);

    const listBeforeOrder = await screen.findByTestId("lista");
    const firstElementBefore = listBeforeOrder.children[0];
    const secondElementBefore = listBeforeOrder.children[1];

    expect(firstElementBefore).toHaveTextContent("bulbasaur");
    expect(secondElementBefore).toHaveTextContent("servine");

    const combobox = await screen.findByRole("combobox", {
      name: "Sort by",
    });
    await userEvent.click(combobox);

    const radio = await screen.findByRole("radio", {
      name: "Special attack",
    });
    await userEvent.click(radio);

    //bulbasur 65Spa servine 60

    const listAfterOrder = await screen.findByTestId("lista");
    const firstElementAfter = listAfterOrder.children[0];
    const secondElementAfter = listAfterOrder.children[1];

    expect(firstElementAfter).toHaveTextContent("bulbasaur");
    expect(secondElementAfter).toHaveTextContent("servine");
  });

  test("comparamos el sort by de Special Defense dos pokemons", async () => {
    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;

    mockFetch.mockImplementation(getGenerateMockFetch().fetchMock2);

    render(<App />);

    const listBeforeOrder = await screen.findByTestId("lista");
    const firstElementBefore = listBeforeOrder.children[0];
    const secondElementBefore = listBeforeOrder.children[1];

    expect(firstElementBefore).toHaveTextContent("bulbasaur");
    expect(secondElementBefore).toHaveTextContent("servine");

    const combobox = await screen.findByRole("combobox", {
      name: "Sort by",
    });
    await userEvent.click(combobox);

    const radio = await screen.findByRole("radio", {
      name: "Special defense",
    });
    await userEvent.click(radio);

    //bulbasur 65Spd  servine 75

    const listAfterOrder = await screen.findByTestId("lista");
    const firstElementAfter = listAfterOrder.children[0];
    const secondElementAfter = listAfterOrder.children[1];

    expect(firstElementAfter).toHaveTextContent("servine");
    expect(secondElementAfter).toHaveTextContent("bulbasaur");
  });

  test("comparamos el sort by de Speed dos pokemons", async () => {
    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;

    mockFetch.mockImplementation(getGenerateMockFetch().fetchMock2);

    render(<App />);

    const listBeforeOrder = await screen.findByTestId("lista");
    const firstElementBefore = listBeforeOrder.children[0];
    const secondElementBefore = listBeforeOrder.children[1];

    expect(firstElementBefore).toHaveTextContent("bulbasaur");
    expect(secondElementBefore).toHaveTextContent("servine");

    const combobox = await screen.findByRole("combobox", {
      name: "Sort by",
    });
    await userEvent.click(combobox);

    const radio = await screen.findByRole("radio", {
      name: "Speed",
    });
    await userEvent.click(radio);
    //bulbasur 45Spd  servine 83

    const listAfterOrder = await screen.findByTestId("lista");
    const firstElementAfter = listAfterOrder.children[0];
    const secondElementAfter = listAfterOrder.children[1];

    expect(firstElementAfter).toHaveTextContent("servine");
    expect(secondElementAfter).toHaveTextContent("bulbasaur");
  });
});
