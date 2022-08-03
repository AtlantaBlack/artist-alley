import './index.css';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const WelcomeScreen = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-flex-child text-center">
        <h1>
          Welcome to
          <br />
          Artist Alley
        </h1>

        <p className="embolden">
          Hello there, friend, you've stumbled across the Artist Alley!
        </p>
        <p>This is a place for artists to share their work with the world.</p>
        <p>
          (And a haven of art to look at for those of us not quite as skilled
          with a paintbrush, or pencil, or clay, or...)
        </p>
        <Link to="/signup">
          <button>
            <FontAwesomeIcon icon={solid('forward-step')} /> GET STARTED
          </button>
        </Link>

        <Link to="/login">
          <button>
            LOGIN <FontAwesomeIcon icon={solid('right-to-bracket')} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeScreen;
