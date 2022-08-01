import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import GlobalHeader from './components/GlobalHeader';
import Home from './pages/Home.js';
import Signup from './pages/Signup.js';
import Login from './pages/Login.js';
import Dashboard from './pages/Dashboard.js';
import Shop from './pages/Shop.js';

import Artists from './components/Artists';
import ArtistPortfolio from './components/ArtistPortfolio';
import ArtistShop from './components/ArtistShop';

// import PostDetails from './components/PostDetails';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    // FONT AWESOME ICONS - currently imported in global header
    // check there to see how to get icons
    <ApolloProvider client={client}>
      <BrowserRouter>
        <GlobalHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/my/table" element={<Shop />} />

          {/* <Route path="posts/:postId" element={<PostDetails/>}/> */}

          {/* need an index element: artists w/ outlet to display artist profile page & artist store page */}
          <Route path="artists" element={<Artists />} />
          <Route path="artists/someArtist" element={<ArtistPortfolio />} />
          <Route path="artists/someArtist/table" element={<ArtistShop />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
