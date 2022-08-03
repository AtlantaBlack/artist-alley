import React from 'react';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
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
    // set the user variables when there's data
    loggedInUser = data.user.username;
    userType = data.user.userType;
    // console.log('logged in user: ', loggedInUser);
    // console.log('user type: ', userType);
  }

  // if user has any posts already made, get them
  const posts = data?.user.posts || [];

  // use local states
  // const [errorMsg, setErrorMessage] = useState(false);
  const [image, setImage] = useState('');
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    createdBy: '',
    image: ''
  });

  const [addPost] = useMutation(ADD_POST);
  const [removePost] = useMutation(REMOVE_POST);

  // reveal 'make a post' on button click
  // https://stackoverflow.com/questions/71784034/react-how-to-add-a-button-click-handler-to-reveal-text
  const [showForm, setShowForm] = useState(false);
  const showFormHandler = async () => {
    setShowForm((showForm) => !showForm);
  };

  // convert the image into base64 and make it a string to send to the database
  const convert64 = async (value) => {
    //https://stackoverflow.com/questions/25763533/how-to-identify-file-type-by-base64-encoded-string-of-a-image

    //image validation to ensure file types are jpg or png - using Object.values as the value is returned as an Object and stringifying it includes the key name. Which we don't want.
    const imageVal = JSON.stringify(Object.values(value));

    // console.log(imageVal);
    // if/else to match data:image type and "conditionaly render" the error message.
    const reveal = document.querySelector('.error-handle');

    if (imageVal.includes('["data:image/png')) {
      reveal.classList.add('hidden');
    } else if (imageVal.startsWith('["data:image/jpeg')) {
      reveal.classList.add('hidden');
    } else if (imageVal.startsWith('["data:image/jpg')) {
      reveal.classList.add('hidden');
    } else {
      reveal.classList.remove('hidden');
    }

    // https://stackoverflow.com/questions/24289182/how-to-strip-type-from-javascript-filereader-base64-string

    const image = JSON.stringify(value).split(';base64,')[1].slice(0, -2);
    // set the image state
    setImage(image);
  };

  // handler for submitting a new post
  const handleFormSubmit = async (event) => {
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
  const handleDeleteClick = async (postId) => {
    // get the post ID out of the button
    const deletePost = await removePost({
      variables: {
        postId,
        createdBy: loggedInUser
      },
      /* to have react reload after deleting the post, one way is to use refetch queries, which will get all the posts again (but is bad for people with slow internet). The other, more performant way is to attach Apollo cache update to the mutation in question itself */
      refetchQueries: [
        {
          query: QUERY_USER,
          variables: { username: Auth.getProfile().data.username }
        }
      ]
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
      <div className="dash-heading">
        <h1>My Dashboard</h1>
      </div>
      <nav className="dash-nav">
        <Link to="/dashboard/my/table">
          <button type="button">Go to your Artist's Table</button>
        </Link>
        <button onClick={showFormHandler}>Make a post!</button>
      </nav>
      {showForm && (
        <div className="post">
          <h2 className="text-center">Share your Art!</h2>
          <div className="post-container">
            <form>
              <div>
                <label htmlFor="title">Post title:</label>
                <input
                  placeholder="Title of post"
                  name="title"
                  type="title"
                  id="title"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea
                  placeholder="Description of post"
                  name="description"
                  type="description"
                  id="description"
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="image-upload">
                <label htmlFor="img">Upload image (Max size 5MB):</label>
                <FileBase64
                  name="file"
                  id="img-upload"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  multiple={false}
                  onDone={({ base64 }) => convert64({ base64 })}
                />
                <p className="error-handle embolden hidden">
                  Incorrect file type.
                </p>
              </div>

              <div>
                <button type="submit" onClick={handleFormSubmit}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="posts">
        <div style={{ border: '1px solid orange' }}>
          {loading ? (
            <div> loading </div>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="post-container">
                <Post postDetails={post} />
                <button
                  type="button"
                  className="float-right"
                  postid={post._id}
                  onClick={() => handleDeleteClick(post._id)}
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
