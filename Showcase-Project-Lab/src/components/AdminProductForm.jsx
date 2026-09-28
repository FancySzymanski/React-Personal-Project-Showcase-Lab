import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import useFetchData from "../hooks/FetchData";
import useMutateData from "../hooks/MutateData";

function AdminProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, addProduct, editProduct } = useOutletContext();
    const { data: locations, loading: locationsLoading } = useFetchData("locations");
    const { createItem, updateItem } = useMutateData("flavors");

    const existingProduct = id
        ? products.find((p) => String(p.id) === String(id))
        : null;

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [imageAlt, setImageAlt] = useState("");
    const [locationsIds, setLocationsIds] = useState([]);

    useEffect(() => {
        if (existingProduct) {
            setName(existingProduct.name);
            setPrice(existingProduct.price);
            setImage(existingProduct.image);
            setImageAlt(existingProduct.imageAlt);
            setLocationsIds(existingProduct.locationsIds.map(String));
        }
    }, [existingProduct]);

    const toggleLocation = (locId) => {
        const idStr = String(locId);
        setLocationsIds((prev) =>
            prev.includes(idStr)
                ? prev.filter((existing) => existing !== idStr)
                : [...prev, idStr]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            name,
            price: Number(price),
            image,
            imageAlt,
            locationsIds: locationsIds.map(Number),
        };

        if (existingProduct) {
            updateItem(existingProduct.id, productData).then((updated) => {
                editProduct({ ...existingProduct, ...updated });
                navigate("/admin/products");
            });
        } else {
            createItem(productData).then((created) => {
                addProduct(created);
                navigate("/admin/products");
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="admin-product-form">
            <h1>{existingProduct ? "Edit Flavor" : "Add New Flavor"}</h1>

            <label htmlFor="name">Name</label>
            <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <label htmlFor="price">Price</label>
            <input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />

            <label htmlFor="image">Image URL</label>
            <input
                id="image"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
            />

            <label htmlFor="imageAlt">Image Alt Text</label>
            <input
                id="imageAlt"
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                required
            />

            <fieldset>
                <legend>Available Locations</legend>
                {locationsLoading ? (
                    <p>Loading locations...</p>
                ) : (
                    locations.map((loc) => (
                        <label key={loc.id} htmlFor={`location-${loc.id}`}>
                            <input
                                type="checkbox"
                                id={`location-${loc.id}`}
                                checked={locationsIds.includes(String(loc.id))}
                                onChange={() => toggleLocation(loc.id)}
                            />
                            {loc.location}
                        </label>
                    ))
                )}
            </fieldset>

            <button type="submit">{existingProduct ? "Save Changes" : "Add Flavor"}</button>
        </form>
    );
}

export default AdminProductForm;
