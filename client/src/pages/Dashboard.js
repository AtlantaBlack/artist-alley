/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// import FileBase64 to convert images to base64 for database
import FileBase64 from 'react-file-base64';

// import the userQuery, useMutation function and applicable mutations/queries
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { ADD_POST, REMOVE_POST } from '../utils/mutations';

// import auth util
import Auth from '../utils/auth';

// import post component
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
    console.log('data in dashboard: ', data);
    // set the user variables when there's data
    loggedInUser = data.user.username;
    userType = data.user.userType;
  }

  // if user has any posts already made, get them
  const posts = data?.user.posts || [];

  // use local states
  const [image, setImage] = useState('');
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    createdBy: '',
    image: '',
    createdAt: ''
  });

  // const [addPost] = useMutation(ADD_POST);

  console.log(posts);

  const [addPost, { error }] = useMutation(ADD_POST, {
    // All returning data from Apollo Client queries/mutations return in a `data` field, followed by the the data returned by the request
    update(cache, { data: { addPost } }) {
      try {
        console.log('update 54 cache:', cache);
        console.log('update 54 data:', data);
        console.log('update 54 addPost', { addPost });

        const {
          user: { posts }
        } = cache.readQuery({
          query: QUERY_USER,
          variables: { username: Auth.getProfile().data.username }
        });

        console.log('read query posts', posts);

        cache.writeQuery({
          query: QUERY_USER,
          variables: { username: Auth.getProfile().data.username },
          data: { user: { posts: [addPost, ...posts] } }
        });
      } catch (e) {
        console.error(e);
      }
    }
  });

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

    // console.log(value);

    //image validation to ensure file types are jpg or png - using Object.values as the value is returned as an Object and stringifying it includes the key name. Which we don't want.
    const imageVal = JSON.stringify(Object.values(value));

    // if/else to match data:image type and "conditionaly render" the error message.
    const reveal = document.querySelector('.file-val-handle');

    if (imageVal.includes('["data:image/png')) {
      reveal.classList.add('hidden');
    } else if (imageVal.startsWith('["data:image/jpeg')) {
      reveal.classList.add('hidden');
    } else if (imageVal.startsWith('["data:image/jpg')) {
      reveal.classList.add('hidden');
    } else if (imageVal.startsWith('["data:image/gif')) {
      reveal.classList.add('hidden');
    } else {
      reveal.classList.remove('hidden');
    }

    //strip the data type form beginning of base64 string
    // https://stackoverflow.com/questions/24289182/how-to-strip-type-from-javascript-filereader-base64-string
    const image = JSON.stringify(value).split(';base64,')[1].slice(0, -2);
    // set the image state
    setImage(image);
  };

  // handler for submitting a new post
  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    try {
      const response = await addPost({
        variables: {
          title: formState.title,
          description: formState.description,
          image: image,
          createdBy: loggedInUser // set the artist as the person logged in
        }
      });

      console.log('data in dashboard form submit: ', response);

      setFormState({
        title: '',
        description: '',
        image: '',
        createdBy: ''
      });
    } catch (err) {
      console.error(err);
    }
  };

  // // handler for submitting a new post
  // const handleFormSubmit = async (event) => {
  //   const response = await addPost({
  //     variables: {
  //       title: formState.title,
  //       description: formState.description,
  //       image: image,
  //       createdBy: loggedInUser // set the artist as the person logged in
  //     },
  //     // reload the page and fetch the artist's updated posts
  //     refetchQueries: [
  //       {
  //         query: QUERY_USER,
  //         variables: { username: Auth.getProfile().data.username }
  //       }
  //     ]
  //   });
  //   console.log('response in dashboard:', response);
  // };

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

  // handler for empty field values that we want users to add a value to
  const handleEmptyField = async (event) => {
    let reveal = document.querySelector('.error-handle');
    if (event.target.value.length === 0) {
      reveal.classList.remove('hidden');
    } else {
      reveal.classList.add('hidden');
    }
  };

  // conditional render for if user is not an artist
  if (userType === 'Non-Artist') {
    return (
      <div className="backing-container">
        <div className="backing-flex-child text-center">
          <h3>Non-Artist features coming soon!</h3>
          <p>In the meantime, why not check out some artists?</p>
        </div>
      </div>
    );
  }

  // if user is an artist, they can see the Add Post form and a list of their previous posts
  return (
    <div className="dash-flex">
      <div className="dash-flex-child dash-bg text-center">
        <div className="dash-heading">
          <h1>My Dashboard</h1>
        </div>
        <p>What would you like to do today, {loggedInUser}?</p>
        <button onClick={showFormHandler}>Make a post!</button>
        <Link to="/dashboard/my/store">
          <button type="button">Go to your Artist's Table →</button>
        </Link>
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
                    type="text"
                    id="title"
                    onChange={handleInputChange}
                    onBlur={handleEmptyField}
                  />
                </div>
                <div>
                  <label htmlFor="description">Description:</label>
                  <textarea
                    placeholder="Description of post"
                    name="description"
                    type="text"
                    id="description"
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="image-upload">
                  <label htmlFor="img">
                    Upload image:{' '}
                    <span className="text-subbier">
                      (Max file size 5MB. File types: .jpg, .jpeg and .png)
                    </span>
                  </label>
                  <FileBase64
                    name="file"
                    id="img-upload"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    multiple={false}
                    onDone={({ base64 }) => convert64({ base64 })}
                  />
                  <p className="file-val-handle embolden hidden">
                    Incorrect file type. Please upload a jpg, jpeg, png or gif
                    file.
                  </p>
                  <p className="error-handle embolden hidden">
                    Field required.
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
        {error && <p>Oops! Something went wrong!</p>}
      </div>

      <div className="dash-flex-child">
        <div className="flex-container">
          {loading ? (
            <div> loading </div>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="flex-child post-container">
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
