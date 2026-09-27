import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LocationCard from "../../components/LocationCard";

const mockLocation = {
  id: 1,
  location: "Lakeside",
  description:
    "Our flagship store, located in beautiful Lakeside right by the botanical gardens!",
  address: "1234 Knick Knack Rd, Richmond, VA",
};

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe("LocationCard", () => {
  it("renders the location name", () => {
    renderWithRouter(<LocationCard location={mockLocation} />);
    expect(screen.getByText("Lakeside")).toBeInTheDocument();
  });

  it("renders the location address", () => {
    renderWithRouter(<LocationCard location={mockLocation} />);
    expect(screen.getByText(mockLocation.address)).toBeInTheDocument();
  });

  it("renders a link pointing to the correct location detail route", () => {
    renderWithRouter(<LocationCard location={mockLocation} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/locations/1");
  });

  it("renders correctly for a different location", () => {
    const fan = {
      id: 2,
      location: "The Fan",
      description: "The second location we ever opened!",
      address: "2468 Paddy Whack Ln, Richmond, VA",
    };
    renderWithRouter(<LocationCard location={fan} />);
    expect(screen.getByText("The Fan")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/locations/2");
  });
});
