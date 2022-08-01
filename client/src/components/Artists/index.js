import './index.css';
import { Outlet } from 'react-router-dom';

const Artists = () => {
  return (
    <div>
      <h2>this is the artist's page</h2>
      <h4>outlet:</h4>

      <Outlet />
    </div>
  );
};

export default Artists;
