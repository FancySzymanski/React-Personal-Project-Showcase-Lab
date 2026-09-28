import { useState } from "react";
 
const useMutateData = (path) => {
    const [error, setError] = useState(null);
 
    const BASE_URL = `http://localhost:3001/${path}`;
 
    const createItem = (item) => {
        setError(null);
        return fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
        })
            .then((r) => {
                if (!r.ok) throw new Error(`Failed to create ${path}`);
                return r.json();
            })
            .catch((e) => {
                setError(e.message);
                throw e;
            });
    };
 
    const updateItem = (id, updates) => {
        setError(null);
        return fetch(`${BASE_URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
        })
            .then((r) => {
                if (!r.ok) throw new Error(`Failed to update ${path}`);
                return r.json();
            })
            .catch((e) => {
                setError(e.message);
                throw e;
            });
    };
 
    const deleteItem = (id) => {
        setError(null);
        return fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
            .then((r) => {
                if (!r.ok) throw new Error(`Failed to delete ${path}`);
            })
            .catch((e) => {
                setError(e.message);
                throw e;
            });
    };
 
    return { createItem, updateItem, deleteItem, error };
};
 
export default useMutateData;
 
