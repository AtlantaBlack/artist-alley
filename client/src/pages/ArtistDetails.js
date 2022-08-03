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
  // console.log the data to make sure the query is working
  // if (data) {
  //   console.log('data:', data);
  // }
  const posts = data?.user.posts || {};

  return (
    <div className="dash-flex">
      <div className="dash-flex-child dash-bg text-center">
        <h1>{artistName}'s Posts</h1>
        <Link to={`/artists/${artistName}/store`}>
          <button type="button">Check out their Artist's Table →</button>
        </Link>
      </div>
      <div className="dash-flex-child dash-bg text-center">
        <div className="flex-container">
          {loading ? (
            <div> loading </div>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="flex-child post-container">
                <Post postDetails={post} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetails;
