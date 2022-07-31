import './index.css';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <>
      <div style={{ margin: '10px' }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            backgroundColor: isActive ? 'yellow' : 'pink'
          })}
        >
          Home
        </NavLink>
      </div>
      <div style={{ margin: '10px' }}>
        <NavLink
          to="/signup"
          style={({ isActive }) => ({
            backgroundColor: isActive ? 'yellow' : 'pink'
          })}
        >
          Signup
        </NavLink>
      </div>
      <div style={{ margin: '10px' }}>
        <NavLink
          to="/login"
          style={({ isActive }) => ({
            backgroundColor: isActive ? 'yellow' : 'pink'
          })}
        >
          login
        </NavLink>
      </div>

      <div style={{ margin: '10px' }}>
        <NavLink
          to="/dashboard"
          style={({ isActive }) => ({
            backgroundColor: isActive ? 'yellow' : 'pink'
          })}
        >
          dashboard
        </NavLink>
      </div>
    </>
  );
};

export default Nav;
