import React from 'react';
import { Outlet } from 'react-router-dom';

import GlobalHeader from './components/GlobalHeader';

function App() {
  return (
    <div>
      <GlobalHeader />
      <Outlet />
    </div>
  );
}

export default App;
