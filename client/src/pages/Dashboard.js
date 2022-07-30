import React from 'react';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import FileBase64 from 'react-file-base64';
import { QUERY_POSTS } from '../utils/queries';
import { ADD_POST } from '../utils/mutations';
import Auth from '../utils/auth';

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

  const [postType, setUserType] = useState('');
  const [image, setImage] = useState('');
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    createdBy: '',
    image: ''
  });

  const [addPost] = useMutation(ADD_POST);

  // convert the image into base64 and make it a string to send to the database
  const convert64 = async (value) => {
    // console.log(value);
    // https://stackoverflow.com/questions/24289182/how-to-strip-type-from-javascript-filereader-base64-string
    const image = JSON.stringify(value).split(';base64,')[1].slice(0, -2);
    // console.log(image);
    setImage(image);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const response = await addPost({
      variables: {
        title: formState.title,
        description: formState.description,
        image: image,
        createdBy: Auth.getProfile().data.username,
        postType: postType
      }
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

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
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="createdBy">Username</label>
            <input
              placeholder="title of post"
              name="createdBy"
              type="createdBy"
              id="createdBy"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              placeholder="description of post"
              name="description"
              type="description"
              id="description"
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div>
            <label htmlFor="img">upload img:</label>
            {/* <button type="button">click to upload image</button> */}
            <FileBase64
              name="file"
              type="file"
              multiple={false}
              onDone={({ base64 }) => convert64({ base64 })}
            />
          </div>

          <div>
            <button type="button" onClick={() => setUserType('Portfolio')}>
              Portfolio
            </button>
          </div>

          <div>
            <button type="button" onClick={handleFormSubmit}>
              Submit
            </button>
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
                <img
                  src={`data:image/png;base64,${post.image}`}
                  alt={post.image}
                />
                <p>posted by {post.createdBy}</p>
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
