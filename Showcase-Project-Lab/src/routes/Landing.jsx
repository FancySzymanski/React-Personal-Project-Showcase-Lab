import { Link } from "react-router-dom"
import NavBar from "../components/NavBar"

function Landing() {
  return (
    <>
      <NavBar />
      <main>
        <h1>🍦🍨 Ice Cream Shop 🍨🍦</h1>
        <p>
          The place for all your Dairy Dessert Desires!
        </p>
        <nav>
          {/* add links for directors page and about page */}
          <Link to="/locations">View Locations!</Link> |{" "}
            <Link to="/shop">View All Products</Link> |{" "}
          <Link to="/AdminLogin">Admins, Login here</Link>
        </nav>
      </main>
    </>
  )
}

export default Landing
