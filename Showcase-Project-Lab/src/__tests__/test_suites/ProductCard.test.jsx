import { render, screen } from "@testing-library/react";
import ProductCard from "../../components/ProductCard";

const mockProduct = {
  id: 1,
  name: "Vanilla",
  price: 4.0,
  image:
    "https://cookienameddesire.com/wp-content/uploads/2020/06/vanilla-ice-cream-1.jpg",
  imageAlt: "Vanilla Ice Cream",
  locationsIds: [1, 2, 3, 4],
};

describe("ProductCard", () => {
  it("renders the product name", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Vanilla")).toBeInTheDocument();
  });

  it("renders the product price formatted as currency", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("$4.00")).toBeInTheDocument();
  });

  it("renders the product image with the correct src and alt text", () => {
    render(<ProductCard product={mockProduct} />);
    const image = screen.getByAltText("Vanilla Ice Cream");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProduct.image);
  });

  it("renders correctly for a different product", () => {
    const chocolate = {
      id: 2,
      name: "Chocolate",
      price: 4.5,
      image: "https://example.com/chocolate.jpg",
      imageAlt: "Chocolate Ice Cream",
      locationsIds: [1, 2, 3, 4],
    };
    render(<ProductCard product={chocolate} />);
    expect(screen.getByText("Chocolate")).toBeInTheDocument();
    expect(screen.getByText("$4.50")).toBeInTheDocument();
    expect(screen.getByAltText("Chocolate Ice Cream")).toBeInTheDocument();
  });
});
