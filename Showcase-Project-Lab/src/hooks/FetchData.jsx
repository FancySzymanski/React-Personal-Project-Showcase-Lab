import { useEffect, useState } from "react";

const useFetchData = (path) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:3001/${path}`)
            .then((r) => {
                if (!r.ok) throw new Error(`failed to fetch ${path}`);
                return r.json();
            })
            .then(setData)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false))
    }, [path]);

    return { data, error, loading };
};

export default useFetchData;