import './index.css';

import Nav from '../Nav';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const GlobalHeader = () => {
  return (
    <>
      <header className="header">
        <h1>Artist Alley</h1>
        <Nav />
      </header>

      <div>
        <FontAwesomeIcon icon={solid('coffee')} />
      </div>
    </>
  );
};

export default GlobalHeader;
