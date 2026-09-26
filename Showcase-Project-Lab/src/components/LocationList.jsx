import NavBar from "../components/NavBar"
import { Outlet } from 'react-router-dom'
import useFetchData from "../hooks/FetchData";

function LocationList() {
    const { data: locations, error: locationsError, loading } = useFetchData("locations");
  return (
    <>
      <NavBar />
      <main>
        <h1>Ice Cream Locations</h1>
        {loading ? (<p>Loading locations...</p>) : (
        <Outlet context={{locations, locationsError }} />
        )}
      </main>
    </>
  )
}

export default LocationList