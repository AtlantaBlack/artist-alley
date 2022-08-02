import './index.css';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';

const ArtistDetails = () => {
  const { createdBy } = useParams();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: createdBy }
  });

  if (data) {
    console.log('data:', data);
  }
  const posts = data?.posts || {};

  console.log('posts by artist:', posts);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>this is the artist's page</h2>
    </div>
  );
};

export default ArtistDetails;
