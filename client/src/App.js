import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import GlobalHeader from './components/GlobalHeader';
import Home from './pages/Home.js';
import Signup from './pages/Signup.js';
import Login from './pages/Login.js';
import Dashboard from './pages/Dashboard.js';
import Shop from './components/Shop';
import PostDetails from './components/PostDetails';

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
        {/* prettier-ignore */}
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />

            <Route path="dashboard" element={<Dashboard />} />
              <Route path="dashboard/my/table" element={<Shop />} />

            <Route path="posts/:postId" element={<PostDetails/>}/>

{/* need an index element: artists w/ outlet to display artist profile page & artist store page */}
            <Route path="artists"/>
              {/* 
              <Route path=":artistId" element={<ArtistProfile />} />
              <Route path=":artistId/table" element={<ArtistShop} /> /> 
              */}
              {/* <Route index element={<Artists/>} /> */}
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
