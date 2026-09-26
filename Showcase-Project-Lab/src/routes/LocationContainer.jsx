import NavBar from "../components/NavBar"
import { Outlet } from 'react-router-dom'
import useFetchData from "../hooks/FetchData";

function LocationContainer() {
    const { data: locations, error: locationsError, loading } = useFetchData("locations");
  return (
    <>
      <NavBar />
      <main>
        {loading ? (<p>Loading locations...</p>) : (
        <Outlet context={{locations, locationsError }} />
        )}
      </main>
    </>
  )
}

export default LocationContainer