import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import ProductContainer from "../../routes/ProductContainer";
import ProductList from "../../components/ProductList";

vi.mock("../../hooks/FetchData", () => ({
  default: vi.fn(),
}));
import useFetchData from "../../hooks/FetchData";

const mockLocations = [
  { id: "1", location: "Lakeside", description: "Flagship store", address: "1234 Knick Knack Rd" },
  { id: "2", location: "The Fan", description: "Second location", address: "2468 Paddy Whack Ln" },
];

const mockFlavors = [
  {
    id: "1",
    name: "Vanilla",
    price: 4.0,
    image: "https://example.com/vanilla.jpg",
    imageAlt: "Vanilla Ice Cream",
    locationsIds: [1, 2],
  },
  {
    id: "2",
    name: "Mint Chocolate Chip",
    price: 5.0,
    image: "https://example.com/mint.jpg",
    imageAlt: "Mint Chocolate Chip Ice Cream",
    locationsIds: [1, 2],
  },
  {
    id: "3",
    name: "Coffee",
    price: 5.0,
    image: "https://example.com/coffee.jpg",
    imageAlt: "Coffee Ice Cream",
    locationsIds: [1],
  },
];

const renderProductContainerAt = (initialPath) => {
  useFetchData.mockImplementation((path) => {
    if (path === "locations") {
      return { data: mockLocations, error: null, loading: false };
    }
    return { data: mockFlavors, error: null, loading: false };
  });

  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/shop" element={<ProductContainer />}>
          <Route index element={<ProductList />} />
        </Route>
        <Route path="/locations/:id" element={<ProductContainer />}>
          <Route index element={<ProductList />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

describe("SearchBar", () => {
  it("renders a text input", () => {
    render(<SearchBar searchTerm="" onSearchChange={() => {}} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("displays the current searchTerm value passed in via props", () => {
    render(<SearchBar searchTerm="Mint" onSearchChange={() => {}} />);
    expect(screen.getByRole("textbox")).toHaveValue("Mint");
  });

  it("calls onSearchChange with the typed text when the user types", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    const { rerender } = render(
      <SearchBar searchTerm="" onSearchChange={handleChange} />
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "M");

    expect(handleChange).toHaveBeenCalledWith("M");


    rerender(<SearchBar searchTerm="M" onSearchChange={handleChange} />);
    await user.type(input, "i");

    expect(handleChange).toHaveBeenCalledWith("Mi");
  });

  it("calls onSearchChange with an empty string when the input is cleared", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<SearchBar searchTerm="Vanilla" onSearchChange={handleChange} />);
    const input = screen.getByRole("textbox");

    await user.clear(input);

    expect(handleChange).toHaveBeenCalledWith("");
  });

  it("renders a placeholder guiding the user to search", () => {
    render(<SearchBar searchTerm="" onSearchChange={() => {}} />);

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });
});

describe("ProductContainer + SearchBar integration", () => {
  it("renders the SearchBar when viewing /shop directly", () => {
    renderProductContainerAt("/shop");
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("does not render the SearchBar when viewing a specific location", () => {
    renderProductContainerAt("/locations/1");
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("shows all flavors on /shop before any search input", () => {
    renderProductContainerAt("/shop");
    expect(screen.getByText("Vanilla")).toBeInTheDocument();
    expect(screen.getByText("Mint Chocolate Chip")).toBeInTheDocument();
    expect(screen.getByText("Coffee")).toBeInTheDocument();
  });

  it("filters displayed flavors to match the typed search term", async () => {
    const user = userEvent.setup();
    renderProductContainerAt("/shop");

    const input = screen.getByRole("textbox");
    await user.type(input, "mint");

    expect(screen.getByText("Mint Chocolate Chip")).toBeInTheDocument();
    expect(screen.queryByText("Vanilla")).not.toBeInTheDocument();
    expect(screen.queryByText("Coffee")).not.toBeInTheDocument();
  });

  it("search is case-insensitive", async () => {
    const user = userEvent.setup();
    renderProductContainerAt("/shop");

    const input = screen.getByRole("textbox");
    await user.type(input, "VANILLA");

    expect(screen.getByText("Vanilla")).toBeInTheDocument();
    expect(screen.queryByText("Mint Chocolate Chip")).not.toBeInTheDocument();
  });

  it("shows all flavors again once the search term is cleared", async () => {
    const user = userEvent.setup();
    renderProductContainerAt("/shop");

    const input = screen.getByRole("textbox");
    await user.type(input, "mint");
    expect(screen.queryByText("Vanilla")).not.toBeInTheDocument();

    await user.clear(input);

    expect(screen.getByText("Vanilla")).toBeInTheDocument();
    expect(screen.getByText("Mint Chocolate Chip")).toBeInTheDocument();
    expect(screen.getByText("Coffee")).toBeInTheDocument();
  });
});
