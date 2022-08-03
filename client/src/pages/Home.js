import React from 'react';
import Auth from '../utils/auth';

import WelcomeScreen from '../components/WelcomeScreen';
import LatestPosts from '../components/LatestPosts';

const Home = () => {
  // if logged in, render latest posts:
  if (Auth.loggedIn()) {
    return (
      <div className="latest-posts">
        <LatestPosts />
      </div>
    );
  }
  // if not logged in, render welcome screen:
  return (
    <div className="welcome">
      <WelcomeScreen />
    </div>
  );
};

export default Home;
