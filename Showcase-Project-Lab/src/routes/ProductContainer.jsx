import { useState } from "react";
import NavBar from "../components/NavBar"
import SearchBar from "../components/SearchBar"
import { useParams, useOutletContext, Outlet } from "react-router-dom";
import useFetchData from "../hooks/FetchData";

function ProductContainer() {
    const { id } = useParams();
    const [searchTerm, setSearchTerm] = useState("");
    const { data: locations, loading: locationsLoading } = useFetchData("locations");
    const { data: flavors, error: flavorError, loading: flavorsLoading } = useFetchData("flavors");

    const location = id && locations
        ? locations.find((loc) => String(loc.id) === String(id))
        : null;

    const displayedFlavors = id
        ? flavors.filter((flavor) => flavor.locationsIds.some((locId) => String(locId) === String(id)))
        : flavors;

    const searchedFlavors = displayedFlavors.filter((flavor) => {
        const matchesName = flavor.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesLocation = flavor.locationsIds.some((locId) => {
            const loc = locations.find((l) => String(l.id) === String(locId));
            return loc && loc.location.toLowerCase().includes(searchTerm.toLowerCase());
        });

        return matchesName || matchesLocation;
    });

    const loading = locationsLoading || flavorsLoading;

    return (
        <>
            {!location && <NavBar />}
            {!location && (
                <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            )}
            {location && (
                <>
                    <h1>{location.location}</h1>
                    <h2>{location.address}</h2>
                </>
            )}
            {loading ? (
                <p>Loading flavors...</p>
            ) : (
                <Outlet
                    context={{
                        products: searchedFlavors,
                        productsError: flavorError,
                        locations,
                        currentLocation: location,
                    }}
                />
            )}
        </>
    );
}

export default ProductContainer