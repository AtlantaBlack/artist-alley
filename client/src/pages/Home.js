import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <p>Here's a thingy on the Home Page</p>
      <p>HAY HAY HAY</p>
      <p>WELCOME TO ARTIST ALLEY</p>

      <Link to="/signup">
        <button>GET STARTED 👇🏼</button>
      </Link>

      <Link to="/login">
        <button>LOGIN 👉🏼</button>
      </Link>
    </div>
  );
};

export default Home;
