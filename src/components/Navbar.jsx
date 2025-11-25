import { Link } from 'react-router-dom';
import logo from '../assets/kidneylogo.jpg'; // Import the logo
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="KidneyCare Logo" className="navbar-logo-img" />
        <span className="navbar-logo-text">KidneyCare</span>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/predict">Predict Disease</Link></li>
        <li><Link to="/hospitals">Hospitals</Link></li>
        <li><Link to="/admin">Project Details</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;