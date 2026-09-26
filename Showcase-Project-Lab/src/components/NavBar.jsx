import { NavLink } from 'react-router-dom';
import './NavBar.css'

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/locations">Locations</NavLink>
      <NavLink to="/shop">All Products</NavLink>
      <NavLink to="/AdminLogin">Admin Portal</NavLink>
    </nav>
  );
}

export default NavBar;
