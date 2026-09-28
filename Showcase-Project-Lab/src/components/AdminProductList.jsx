import { useOutletContext, Link } from "react-router-dom";
import AdminProductCard from "./AdminProductCard";

function AdminProductList() {
    const { products, productsError } = useOutletContext();

    return (
        <>
            <h1>Manage Flavors</h1>
            <Link to="/admin/products/new">Add New Product</Link>
            <div className="product-list">
                {productsError ? (
                    <p>Error Loading Products</p>
                ) : (
                    products.map((product) => (
                        <AdminProductCard key={product.id} product={product} />
                    ))
                )}
            </div>
        </>
    );
}

export default AdminProductList;
