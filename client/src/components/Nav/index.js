import './index.css';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Nav = () => {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul>
          <li>
            <Link to="/" className="navbar-link">
              Latest Posts
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="navbar-link">
              Dashboard
            </Link>
          </li>
          <li>
            {/* use regular anchor tag to force app to refresh when user logs out */}
            <a
              href="/"
              className="float-right logout-link"
              onClick={() => Auth.logout()}
            >
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li>
            <Link to="/signup" className="navbar-link">
              Signup
            </Link>
          </li>
          <li>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return <nav className="navbar">{showNavigation()}</nav>;
};

export default Nav;
