import React from 'react';

// import WelcomeScreen from '../components/WelcomeScreen';
import LatestPosts from '../components/LatestPosts';

const Home = () => {
  // if not logged in, render welcome screen:
  // return (
  //   <div>
  //     HOME PAGE
  //     <WelcomeScreen />
  //   </div>
  // );

  // if logged in, render latest posts:
  // code here
  return (
    <div>
      HOME PAGE
      <LatestPosts />
    </div>
  );
};

export default Home;
