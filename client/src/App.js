import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import GlobalHeader from './components/GlobalHeader';
import Home from './pages/Home.js';
import Signup from './pages/Signup.js';
import Login from './pages/Login.js';

import Dashboard from './pages/Dashboard.js';
import Shop from './pages/Shop.js';

import SinglePost from './pages/SinglePost.js';

import Artists from './pages/Artists.js';
import ArtistDetails from './pages/ArtistDetails.js';
import ArtistShopDetails from './pages/ArtistShop.js';

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

          <Route path="posts/:postId" element={<SinglePost />} />

          {/* need an index element: artists w/ outlet to display artist profile page & artist store page */}
          <Route path="artists" element={<Artists />} />
          <Route path="artists/:artistName" element={<ArtistDetails />} />
          <Route
            path="artists/:artistName/table"
            element={<ArtistShopDetails />}
          />

          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
