/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// import the useMutation function and ADD_USER mutation
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function Signup(props) {
  // set local state for userType
  const [userType, setUserType] = useState('');
  const [formState, setFormState] = useState({ email: '', password: '' });

  //use the addUser mutation
  const [addUser, { error, data }] = useMutation(ADD_USER);

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
    Auth.login(data.addUser.token);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  // client side form validation. Had to use classList.add etc as useState wasn't playing nice with form submit
  const handleEmptyField = (event) => {
    let reveal = document.querySelector('.error-handle');
    if (event.target.value.length === 0) {
      reveal.classList.remove('hidden');
    } else {
      reveal.classList.add('hidden');
    }
  };

  // rendering form
  return (
    <>
      {/* if there is no user type defined, then show this first container that asks what type of user they are */}
      {!userType && (
        <div className="backing-container userType-container">
          <div className="backing-flex-child text-center">
            <h2>Signing up!</h2>

            <p>First, let's determine what kind of alley-goer you are.</p>

            <h2>I am ...</h2>

            <button type="button" onClick={() => setUserType('Artist')}>
              An Artist
            </button>
            <button type="button" onClick={() => setUserType('Non-Artist')}>
              A Wizard
            </button>
            <Link to="/login">
              <p className="text-sub">
                (Actually, I'm already a user. Go to Login →)
              </p>
            </Link>
          </div>
        </div>
      )}

      {/* if the user type is defined then show the sign up form */}
      {userType && (
        <div className="backing-container">
          <div className="backing-flex-child text-center">
            <h2>New {userType} incoming!</h2>
            <p>Please fill out your details below.</p>
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
                    onBlur={handleEmptyField}
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
                    onBlur={handleEmptyField}
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
                    onBlur={handleEmptyField}
                  />
                </div>

                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    placeholder="youremail@email.com"
                    name="email"
                    inputMode="email"
                    type="email"
                    id="email"
                    onChange={handleInputChange}
                    onBlur={handleEmptyField}
                  />
                </div>

                <div>
                  <label htmlFor="password">
                    Password:{' '}
                    <span className="text-subbier">
                      (Min 8 length; must include upper, lower, special chars &
                      numbers)
                    </span>
                  </label>

                  <input
                    placeholder="*****"
                    name="password"
                    type="password"
                    id="pwd"
                    onChange={handleInputChange}
                    onBlur={handleEmptyField}
                  />
                </div>

                <div>
                  <label htmlFor="birthday">
                    Birthday: <span className="text-subbier">(MM/DD/YYYY)</span>
                  </label>
                  <input
                    placeholder="MM/DD/YYYY"
                    name="birthday"
                    type="date"
                    id="birthday"
                    onChange={handleInputChange}
                    onBlur={handleEmptyField}
                  />
                </div>

                <div>
                  <p className="error-handle hidden">Field is required!</p>
                  {error ? (
                    <div>
                      <p>Sorry! One of your details is incorrect!</p>
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
        </div>
      )}
    </>
  );
}

export default Signup;
