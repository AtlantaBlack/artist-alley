/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

// import the useMutation function and ADD_USER mutation
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function Signup(props) {
  // set local state for userType
  const [userType, setUserType] = useState('');
  const [formState, setFormState] = useState({ email: '', password: '' });

  // set local state for error handling
  const [errorMsg, setErrorMessage] = useState(false);

  //use the addUser mutation
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // CURRENTLY ONLY CONSOLE LOGGING THE SIGNUP RESPONSES
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { data } = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        username: formState.username,
        firstName: formState.firstName,
        lastName: formState.lastName,
        birthday: formState.birthday,
        userType: userType
      }
    });
    // add auths and stuff here also
    console.log(data.addUser.token);

    Auth.login(data.addUser.token);

    console.log('this worked!', data);
    console.log('heres the', data.addUser.token);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleEmptyField = (event) => {
    // console.log(event.target);
    console.log(event.target.value.length);
    setErrorMessage((errorMsg) => !errorMsg);
    if (event.target.value.length === 0) {
      setErrorMessage(`${event.target.name} field is required.`);
      console.log(errorMsg);
    } else {
      setErrorMessage('');
    }
  };

  // rendering form
  return (
    <div>
      {/* if there is no user type defined, then show this first container that asks what type of user they are */}
      {!userType && (
        <div className="userType-container">
          <h2>Welcome to the Artist Alley! Let's get started!</h2>
          <h2>You are...</h2>

          <button type="button" onClick={() => setUserType('Artist')}>
            An Artist
          </button>
          <button type="button" onClick={() => setUserType('Non-Artist')}>
            A Wizard
          </button>
        </div>
      )}

      {/* if the user type is defined then show the sign up form */}
      {userType && (
        <div>
          {/* this here for testing the local state */}
          {/* <p>the user is a(n):</p>
          {userType} */}

          <h2 className="text-center">
            Join the Artist Alley! Fill out your details below.
          </h2>
          <div className="signup-container">
            <form>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  placeholder="Username"
                  name="username"
                  type="username"
                  id="username"
                  onChange={handleInputChange}
                  onBlurCapture={handleEmptyField}
                />
              </div>
              <div>
                <label htmlFor="firstName">First name:</label>
                <input
                  placeholder="First"
                  name="firstName"
                  type="firstName"
                  id="firstName"
                  onChange={handleInputChange}
                  onBlurCapture={handleEmptyField}
                />
              </div>

              <div>
                <label htmlFor="lastName">Last name:</label>
                <input
                  placeholder="Last"
                  name="lastName"
                  type="lastName"
                  id="lastName"
                  onChange={handleInputChange}
                  onBlurCapture={handleEmptyField}
                />
              </div>

              <div>
                <label htmlFor="email">Email:</label>
                <input
                  placeholder="youremail@email.com"
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleInputChange}
                  onBlurCapture={handleEmptyField}
                />
              </div>

              <div>
                <label htmlFor="password">Password:</label>
                <input
                  placeholder="*****"
                  name="password"
                  type="password"
                  id="pwd"
                  onChange={handleInputChange}
                  onBlurCapture={handleEmptyField}
                />
              </div>

              <div>
                <label htmlFor="birthday">Birthday:</label>
                <input
                  placeholder="MM/DD/YYYY"
                  name="birthday"
                  type="birthday"
                  id="birthday"
                  onChange={handleInputChange}
                  onBlurCapture={handleEmptyField}
                />
              </div>
              {/* <div className="submit-button"> */}
              {/* CHANGE THIS TO TYPE=SUBMIT LATER */}
              <div>
                {errorMsg && <p className="error-handle">{errorMsg}</p>}
                {error ? (
                  <div>
                    <p>Sorry! One of your details are incorrect!</p>
                  </div>
                ) : null}
              </div>
              <button
                className="submit-button text-center"
                type="button"
                onClick={handleFormSubmit}
              >
                Submit
              </button>
              {/* </div> */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
