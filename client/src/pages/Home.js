import React from 'react';
import Auth from '../utils/auth';

import WelcomeScreen from '../components/WelcomeScreen';
import LatestPosts from '../components/LatestPosts';

const Home = () => {
  // if logged in, render latest posts:
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
};

export default Home;
