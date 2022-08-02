import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import Post from '../components/Post';

const ArtistDetails = () => {
  const { artistName } = useParams();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: artistName }
  });

  if (data) {
    console.log('data:', data);
  }
  const posts = data?.user.posts || {};

  console.log('posts by artist:', posts);

  return (
    <div className="posts">
      <div style={{ border: '1px solid orange' }}>
        <div>
          <h3>{artistName}'s Portfolio</h3>
          <Link to={`/artists/${artistName}/store`}>
            <button type="button">Check out their Artist's Table!</button>
          </Link>
        </div>
        {loading ? (
          <div> loading </div>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post-container">
              <Post postDetails={post} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArtistDetails;
