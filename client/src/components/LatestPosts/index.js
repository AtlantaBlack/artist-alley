import './index.css';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../../utils/queries';

import Post from '../Post';

const LatestPosts = () => {
  // const posts = [
  //   {
  //     id: 1,
  //     title: 'this is a piece of crap',
  //     description: 'piece of crap i said',
  //     image: 'notworking.jpg',
  //     postType: 'Portfolio',
  //     user: {
  //       id: '62e25dedb892551267e87606',
  //       username: 'quinn'
  //     }
  //   },
  //   {
  //     id: 2,
  //     title: 'hey hey hey',
  //     description: 'fancy volleyball guy',
  //     image: 'notworking2.jpg',
  //     postType: 'Portfolio',
  //     user: {
  //       id: '62e25dedb892551267e87606',
  //       username: 'quinn'
  //     }
  //   }
  // ];

  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  console.log('posts', posts);

  return (
    <>
      <h2>Latest Posts</h2>
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
