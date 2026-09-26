import { Link } from "react-router-dom";

function LocationCard({ location }) {
    return (
        <Link to={`/locations/${location.id}`} className="location-card">
            <h2>{location.location}</h2>
            <p>{location.description}</p>
            <h3>{location.address}</h3>
        </Link>
    );
}

export default LocationCard