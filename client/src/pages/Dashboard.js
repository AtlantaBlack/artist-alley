import React from 'react';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import FileBase64 from 'react-file-base64';
import { QUERY_USER } from '../utils/queries';
import { ADD_POST, REMOVE_POST } from '../utils/mutations';
import Auth from '../utils/auth';

import Post from '../components/Post';

const Dashboard = () => {
  // console.log('load dashboard');
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: Auth.getProfile().data.username }
  });
  // set user variables to fill in later
  let loggedInUser;
  let userType;

  // if query returns with a user
  if (data) {
    // console.log('data in dashboard', data);

    // set the user variables when there's data
    loggedInUser = data.user.username;
    userType = data.user.userType;

    console.log('logged in user: ', loggedInUser);
    console.log('user type: ', userType);
  }

  // if user has any posts already made, get them
  const posts = data?.user.posts || [];

  // use local states
  const [image, setImage] = useState('');
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    createdBy: '',
    image: ''
  });

  const [addPost] = useMutation(ADD_POST);
  const [removePost] = useMutation(REMOVE_POST);

  // convert the image into base64 and make it a string to send to the database
  const convert64 = async (value) => {
    // https://stackoverflow.com/questions/24289182/how-to-strip-type-from-javascript-filereader-base64-string
    const image = JSON.stringify(value).split(';base64,')[1].slice(0, -2);
    // set the image state
    setImage(image);
  };

  // handler for submitting a new post
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await addPost({
      variables: {
        title: formState.title,
        description: formState.description,
        image: image,
        createdBy: loggedInUser // set the artist as the person logged in
      }
    });
    console.log(response);
  };

  // for getting info from the add post form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
      createdBy: loggedInUser // set the artist as the person logged in
    });
  };

  // delete event for deleting a post
  const handleDeleteClick = async (event) => {
    // get the post ID out of the button
    const postId = event.target.getAttribute('postid');

    const deletePost = await removePost({
      variables: {
        postId,
        createdBy: loggedInUser
      }
    });
    console.log('deletedPost: ', deletePost);
  };

  // conditional render for if user is not an artist
  if (userType === 'Non-Artist') {
    return (
      <div>
        <h3>Non-Artist features coming soon!</h3>
        <p>In the meantime, why not check out some artists?</p>
      </div>
    );
  }

  // if user is an artist, they can see the Add Post form and a list of their previous posts
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
                {/* <p>likes:</p> */}
                <Post postDetails={post} />
                <button
                  type="button"
                  postid={post._id}
                  onClick={handleDeleteClick}
                >
                  Delete Post
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
