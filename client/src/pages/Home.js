import React from 'react';

import WelcomeScreen from '../components/WelcomeScreen';

const Home = () => {
  // if not logged in, render welcome screen:
  return (
    <div>
      HOME PAGE
      <WelcomeScreen />
    </div>
  );

  // if logged in, render latest posts:
  // code here
};

export default Home;
