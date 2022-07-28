import React from 'react';

const Dashboard = () => {
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
    <div>
      <h2>posts</h2>
      {/* map posts */}
      {posts.map((post) => (
        <div
          key={post.id}
          style={{ border: '1px solid green', margin: '10px 0' }}
        >
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <img src={post.image} alt={post.image} />
          <p>posted by {post.user.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
