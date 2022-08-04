import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import GlobalHeader from './components/GlobalHeader';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';

import Dashboard from './pages/Dashboard';
import Shop from './pages/Shop';

import SinglePost from './pages/SinglePost';

import Artists from './pages/Artists';
import ArtistDetails from './pages/ArtistDetails';
import ArtistShopDetails from './pages/ArtistShop';
import PageNotFound from './pages/404NotFound';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <GlobalHeader />
        <Routes>
          <Route exact-path="/" element={<Home />} />
          <Route exact-path="/dashboard" element={<Dashboard />} />
          <Route exact-path="/dashboard/my/store" element={<Shop />} />

          <Route exact-path="/posts/:postId" element={<SinglePost />} />

          <Route exact-path="/artists" element={<Artists />} />
          <Route
            exact-path="/artists/:artistName"
            element={<ArtistDetails />}
          />
          <Route
            exact-path="/artists/:artistName/store"
            element={<ArtistShopDetails />}
          />

          <Route exact-path="/signup" element={<Signup />} />
          <Route exact-path="/login" element={<Login />} />

          <Route exact-path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
