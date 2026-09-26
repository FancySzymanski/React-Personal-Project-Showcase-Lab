import { useOutletContext } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductList = () => {
    const { products, productsError, locations, currentLocation } = useOutletContext();

    return (
        <>
            <h2>Our Flavors</h2>
            <div className="product-list">
                {productsError ? (
                    <p>Error Loading Products</p>
                ) : (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} locations={locations} currentLocation={currentLocation} />
                    ))
                )}
            </div>
        </>
    );
}

export default ProductList