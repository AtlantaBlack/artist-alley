import { NavLink } from 'react-router-dom';
import './index.css';

const GlobalHeader = () => {
  return (
    // blue border to show the header boundary
    <div style={{ border: '1px solid blue' }}>
      {/* artist alley */}
      <h1 className="header">Artist Alley</h1>
      {/* nav bar starts here */}
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
    </div>
  );
};

export default GlobalHeader;
