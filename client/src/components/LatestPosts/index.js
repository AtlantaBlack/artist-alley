import './index.css';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../../utils/queries';

import Post from '../Post';

const LatestPosts = () => {
  // get all the posts
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];
  // console.log('posts', posts);

  return (
    <>
      <h1 className="text-center">Latest Artworks</h1>
      <div style={{ border: '1px solid orange' }}>
        {loading ? (
          <div> loading </div>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post-container">
              {<Post postDetails={post} />}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default LatestPosts;
