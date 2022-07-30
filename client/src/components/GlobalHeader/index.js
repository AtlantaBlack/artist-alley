import { NavLink } from 'react-router-dom';
import './index.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const GlobalHeader = () => {
  return (
    <>
      <header className="header">
        <h1>Artist Alley</h1>
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
      </header>

      <div>
        <FontAwesomeIcon icon={solid('coffee')} />
      </div>
    </>
  );
};

export default GlobalHeader;
