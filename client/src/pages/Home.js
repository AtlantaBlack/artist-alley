import React from 'react';
import Auth from '../utils/auth';

import WelcomeScreen from '../components/WelcomeScreen';
import LatestPosts from '../components/LatestPosts';

const Home = () => {
  if (Auth.loggedIn()) {
    return (
      <div>
        HOME PAGE
        <LatestPosts />
      </div>
    );
  }
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
