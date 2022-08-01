import './index.css';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const Nav = () => {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul>
          <li>
            <Link to="/dashboard" className="navbar-link">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/table" className="navbar-link">
              Artist Table
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
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      );
    }
  }

  return <nav className="navbar">{showNavigation()}</nav>;

  // return (
  //   <>
  //     <div style={{ margin: '10px' }}>
  //       <NavLink
  //         to="/"
  //         style={({ isActive }) => ({
  //           color: isActive ? 'yellow' : 'pink'
  //         })}
  //       >
  //         <FontAwesomeIcon icon={solid('house-chimney-window')} />
  //       </NavLink>
  //     </div>
  //     <div style={{ margin: '10px' }}>
  //       <NavLink
  //         to="/signup"
  //         style={({ isActive }) => ({
  //           color: isActive ? 'yellow' : 'pink'
  //         })}
  //       >
  //         Signup
  //       </NavLink>
  //     </div>
  //     <div style={{ margin: '10px' }}>
  //       <NavLink
  //         to="/login"
  //         style={({ isActive }) => ({
  //           color: isActive ? 'yellow' : 'pink'
  //         })}
  //       >
  //         login
  //       </NavLink>
  //     </div>

  //     <div style={{ margin: '10px' }}>
  //       <NavLink
  //         to="/dashboard"
  //         style={({ isActive }) => ({
  //           backgroundColor: isActive ? 'yellow' : 'pink'
  //         })}
  //       >
  //         dashboard
  //       </NavLink>
  //     </div>
  //   </>
  // );
};

export default Nav;
