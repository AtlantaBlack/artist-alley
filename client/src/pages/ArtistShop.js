import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER_MERCH } from '../utils/queries';
import Merch from '../components/Merch';

const ArtistShopDetails = () => {
  const { artistName } = useParams();
  const { loading, data } = useQuery(QUERY_USER_MERCH, {
    variables: { username: artistName }
  });
  // if (data) {
  //   console.log('data:', data);
  // }
  const merch = data?.merch.merch || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dash-flex">
      <div className="dash-flex-child dash-bg text-center">
        <h1>{artistName}'s Artist's Table</h1>
        <Link to={`/artists/${artistName}`}>
          <button type="button">← Return to {artistName}'s posts</button>
        </Link>
      </div>
      <div className="dash-flex-child dash-bg text-center">
        <div className="flex-container">
          {merch.length ? (
            merch.map((item) => (
              <div key={item._id} className="flex-child merch-container">
                <Merch merch={item} />
              </div>
            ))
          ) : (
            <div className="flex-child">
              <h4>Looks like there's nothing here ...</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistShopDetails;
