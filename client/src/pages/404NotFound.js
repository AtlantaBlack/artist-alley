import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div>
      <h2>404 Page Not Found!</h2>
      <h4>Looks like we couldn't find the page you were after.</h4>

      <Link to="/">
        <button type="button">Back to Home</button>
      </Link>
    </div>
  );
};

export default PageNotFound;
