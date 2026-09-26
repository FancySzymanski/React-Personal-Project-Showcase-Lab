import NavBar from "../components/NavBar"
import { useParams, useOutletContext, Outlet } from "react-router-dom";
import useFetchData from "../hooks/FetchData";

function ProductContainer() {
    const { id } = useParams();
    const { data: locations, loading: locationsLoading } = useFetchData("locations");
    const { data: flavors, error: flavorError, loading: flavorsLoading } = useFetchData("flavors");

    const location = id && locations
        ? locations.find((loc) => String(loc.id) === String(id))
        : null;

    const displayedFlavors = id
    ? flavors.filter((flavor) => flavor.locationsIds.some((locId) => String(locId) === String(id)))
    : flavors;

    const loading = locationsLoading || flavorsLoading;

    return (
        <>
        {!location && <NavBar />}
            {location && (
                <>
                    <h1>{location.location}</h1>
                    <h2>{location.address}</h2>
                </>
            )}
            {loading ? (
                <p>Loading flavors...</p>
            ) : (
                <Outlet context= {{products: displayedFlavors, productsError: flavorError, locations, currentLocation: location}} />
            )}
        </>
    );
}

export default ProductContainer