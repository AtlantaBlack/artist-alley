import { NavLink } from 'react-router-dom';
import './index.css';

const GlobalHeader = () => {
  return (
    <div>
      <header style={{ border: '1px solid blue' }}>
        <h1 className="header">Artist Alley</h1>
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
      </header>
    </div>
  );
};

export default GlobalHeader;
