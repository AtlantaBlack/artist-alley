import React, { useEffect } from 'react';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import FileBase64 from 'react-file-base64';
import { QUERY_USER } from '../utils/queries';
import { ADD_POST } from '../utils/mutations';
import Auth from '../utils/auth';

import Post from '../components/Post';

const Dashboard = () => {
  // console.log('load');

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: Auth.getProfile().data.username }
  });

  // console.log(data);
  const posts = data?.user.posts || [];
  // console.log(data);

  // set the person logged in as the artist
  const loggedInArtist = Auth.getProfile().data.username;

  useEffect(() => {
    console.log('use effect');
    console.log('load');
  }, []);

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
    console.log('ARE U DOING ');

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
        createdBy: loggedInArtist // set the artist as the person logged in
      }
    });
    console.log(response);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
      createdBy: loggedInArtist // set the artist as the person logged in
    });
  };

  // const postContainerStyling = {
  //   flex: '0 0 45%',
  //   border: '1px solid blue',
  //   backgroundColor: 'var(--pale-pink)',
  //   margin: '10px 0'

  return (
    <div>
      <h1>My Dashboard</h1>
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
            <button type="submit" onClick={handleFormSubmit}>
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
              <div key={post._id} className="post-container">
                {/* <h3>{post.title}</h3>
                <p>{post.description}</p>
                <img
                  src={`data:image/png;base64,${post.image}`}
                  alt={post.description}
                />
                <p>posted by {post.createdBy}</p>
                <p>likes:</p> */}
                <Post postDetails={post} loggedInArtist={loggedInArtist} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
