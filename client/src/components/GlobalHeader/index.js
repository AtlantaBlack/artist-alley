import './index.css';
import { Link } from 'react-router-dom';

import Nav from '../Nav';

const GlobalHeader = () => {
  return (
    <>
      <header className="header">
        <Link to="/">
          <h1>Artist Alley</h1>
        </Link>
        <Nav />
      </header>
    </>
  );
};

export default GlobalHeader;
