import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';

const Dashboard = () => {
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

  console.log(posts);

  return (
    <div>
      <div className="add-post">
        <h2>add a post</h2>
        <form>
          <div>
            <label htmlFor="title">Post title:</label>
            <input
              placeholder="title of post"
              name="title"
              type="title"
              id="title"
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              placeholder="description of post"
              name="description"
              type="description"
              id="description"
            ></textarea>
          </div>

          <div>
            <label htmlFor="img">upload img:</label>
            <button type="button">click to upload image</button>
          </div>

          <div>
            <button type="button">Submit</button>
          </div>
        </form>
      </div>

      <div className="posts">
        <h2>posts</h2>

        <div style={{ border: '1px solid orange' }}>
          {loading ? (
            <div> loading </div>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                style={{ border: '1px solid green', margin: '10px 0' }}
              >
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <img src={post.image} alt={post.image} />
                <p>posted by {post.username}</p>
                <p>likes:</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
