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

  if (data) {
    console.log('data:', data);
  }
  const merch = data?.merch.merch || {};

  console.log('merch by artist:', merch);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="posts">
      <div style={{ border: '1px solid orange' }}>
        <div>
          <h3>{artistName}'s Artist's Table</h3>
          <Link to={`/artists/${artistName}`}>
            <button type="button">Return to {artistName}'s portfolio</button>
          </Link>
        </div>
        {merch.length ? (
          merch.map((item) => (
            <div key={item._id} className="merch-container">
              <Merch merch={item} />
            </div>
          ))
        ) : (
          <div>
            <h4>Looks like there's nothing here ...</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistShopDetails;
