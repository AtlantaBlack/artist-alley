import './index.css';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const WelcomeScreen = () => {
  return (
    <div className="text-center">
      {/* <p>Here's a thingy on the Home Page</p>
      <p>HAY HAY HAY</p> */}
      <h2>WELCOME TO ARTIST ALLEY</h2>

      <p className="embolden">
        Hello there, friend, you've stumbled across the Artist Alley!
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

      <p className="embolden">
        A place for artists to share their work with the world!
      </p>
      <p className="embolden">
        (And a haven of art to look at for those of us not quite as skilled with
        a paintbrush, or pencil, or clay, or...)
      </p>
    </div>
  );
};

export default WelcomeScreen;
