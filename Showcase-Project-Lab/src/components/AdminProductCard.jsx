import { Link, useOutletContext } from "react-router-dom";
import useMutateData from "../hooks/MutateData";

function AdminProductCard({ product }) {
    const { removeProduct } = useOutletContext();
    const { deleteItem } = useMutateData("flavors");

    const handleDelete = () => {
        deleteItem(product.id).then(() => removeProduct(product.id));
    };

    return (
        <div className="product-card">
            <img src={product.image} alt={product.imageAlt} className="product-image" />
            <h2>{product.name}</h2>
            <p>${product.price.toFixed(2)}</p>
            <Link to={`/admin/products/${product.id}/edit`}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default AdminProductCard;
