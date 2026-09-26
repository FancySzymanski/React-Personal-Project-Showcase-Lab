import { render, screen } from "@testing-library/react";
import ProductCard from "../../components/ProductCard";

// Sample flavor matching the shape of entries in db.json
const mockFlavor = {
  id: 1,
  name: "Vanilla",
  Price: 4.0,
  Image:
    "https://cookienameddesire.com/wp-content/uploads/2020/06/vanilla-ice-cream-1.jpg",
  ImageAlt: "Vanilla Ice Cream",
  LocationsIds: [1, 2, 3, 4],
};

describe("ProductCard", () => {
  it("renders the flavor name", () => {
    render(<ProductCard flavor={mockFlavor} />);
    expect(screen.getByText("Vanilla")).toBeInTheDocument();
  });

  it("renders the flavor price", () => {
    render(<ProductCard flavor={mockFlavor} />);
    // Adjust this matcher to however you format price in the component
    // (e.g. "$4.00", "4.00", "$4")
    expect(screen.getByText(/4\.00|4\.0|\$4/)).toBeInTheDocument();
  });

  it("renders the flavor image with the correct src and alt text", () => {
    render(<ProductCard flavor={mockFlavor} />);
    const image = screen.getByAltText("Vanilla Ice Cream");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockFlavor.Image);
  });

  it("renders correctly for a different flavor", () => {
    const chocolate = {
      id: 2,
      name: "Chocolate",
      Price: 4.5,
      Image: "https://example.com/chocolate.jpg",
      ImageAlt: "Chocolate Ice Cream",
      LocationsIds: [1, 2, 3, 4],
    };
    render(<ProductCard flavor={chocolate} />);
    expect(screen.getByText("Chocolate")).toBeInTheDocument();
    expect(screen.getByAltText("Chocolate Ice Cream")).toBeInTheDocument();
  });
});
