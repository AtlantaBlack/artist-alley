import './index.css';

const LatestPosts = () => {
  const posts = [
    {
      id: 1,
      title: 'this is a piece of crap',
      description: 'piece of crap i said',
      image: 'notworking.jpg',
      postType: 'Portfolio',
      user: {
        id: '62e25dedb892551267e87606',
        username: 'quinn'
      }
    },
    {
      id: 2,
      title: 'hey hey hey',
      description: 'fancy volleyball guy',
      image: 'notworking2.jpg',
      postType: 'Portfolio',
      user: {
        id: '62e25dedb892551267e87606',
        username: 'quinn'
      }
    }
  ];

  return (
    <>
      <h2>Latest Posts</h2>
      {posts.map((post) => (
        <div style={{ border: '1px solid cyan' }}>
          <h2>{post.title}</h2>
          <p>by {post.user.username}</p>
          <p>{post.description}</p>
        </div>
      ))}
    </>
  );
};

export default LatestPosts;
