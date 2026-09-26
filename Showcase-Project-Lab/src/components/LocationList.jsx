import { useOutletContext } from "react-router-dom";
import LocationCard from "./LocationCard";

const LocationList = () => {
    const { locations, locationsError } = useOutletContext();

    return (
        <>
            <h1>Ice Cream Locations</h1>
            <div className="location-list">
                {locationsError !== null ? (
                    <p>Error Loading Locations</p>
                ) : (
                    locations.map((location) => (
                        <LocationCard key={location.id} location={location} />
                    ))
                )}
            </div>
        </>
    );
}

export default LocationList