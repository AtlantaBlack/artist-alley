import './index.css';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../../utils/queries';

import Post from '../Post';

const LatestPosts = () => {
  // get all the posts
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];
  console.log('posts in post: ', posts);

  return (
    <div className="dash-flex">
      <div className="dash-flex-child dash-bg text-center">
        <h1 className="text-center">Latest Artworks</h1>
      </div>
      <div className="dash-flex-child dash-bg text-center">
        <div style={{ border: '1px solid orange' }} className="flex-container">
          {loading ? (
            <div> loading </div>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="flex-child post-container">
                {<Post postDetails={post} />}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestPosts;
