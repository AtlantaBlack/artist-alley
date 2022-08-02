import React from 'react';
import { Outlet } from 'react-router-dom';

const Artists = () => {
  return (
    <div>
      <h2>search for artists here</h2>
      <h4>outlet:</h4>

      <Outlet />
    </div>
  );
};

export default Artists;
