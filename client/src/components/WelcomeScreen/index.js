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
          Artist Alley!
        </h1>

        <p className="embolden">
          Hello there, friend, you've stumbled across the Artist Alley.
        </p>
        <p>
          Artist Alley is a place for artists to share and sell their creative
          work. Build a portfolio by making posts, set up a store and fill it
          with merchandise. With everything in the one location, it couldn't be
          easier for our artsy folks to do business -- or more convenient!
        </p>
        <p>Interested? Sign up for a free account now!</p>
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
