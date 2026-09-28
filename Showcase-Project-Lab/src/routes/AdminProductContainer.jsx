import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAdmin } from "../components/AdminContext";
import useFetchData from "../hooks/FetchData";

function AdminProductContainer() {
    const { isAdmin, logout } = useAdmin();
    const { data: fetchedFlavors, error, loading } = useFetchData("flavors");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!loading) setProducts(fetchedFlavors);
    }, [loading, fetchedFlavors]);

    if (!isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    const addProduct = (newProduct) => {
        setProducts((prev) => [...prev, newProduct]);
    };

    const editProduct = (updatedProduct) => {
        setProducts((prev) =>
            prev.map((p) => (String(p.id) === String(updatedProduct.id) ? updatedProduct : p))
        );
    };

    const removeProduct = (id) => {
        setProducts((prev) => prev.filter((p) => String(p.id) !== String(id)));
    };

    return (
        <>
            <NavBar />
            <button onClick={logout}>Log Out</button>
            {loading ? (
                <p>Loading products...</p>
            ) : (
                <Outlet
                    context={{
                        products,
                        productsError: error,
                        addProduct,
                        editProduct,
                        removeProduct,
                    }}
                />
            )}
        </>
    );
}

export default AdminProductContainer;
