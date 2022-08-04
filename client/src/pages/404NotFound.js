import React from 'react';
import { Link } from 'react-router-dom';

// custom 404 page

const PageNotFound = () => {
  return (
    <div className="backing-container">
      <div className="backing-flex-child text-center">
        <h2>404 Page Not Found!</h2>

        <p>It looks like we couldn't find the page you were after.</p>
        <p className="embiggen">☹</p>
        <Link to="/">
          <button type="button">← Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
