import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

// login functions
function Login(props) {
  //set form state
  const [formState, setFormState] = useState({ email: '', password: '' });

  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password }
      });

      console.log(mutationResponse);

      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  // render form
  return (
    <div className="backing-container userType-container">
      <div className="backing-flex-child text-center">
        <h2>Logging in!</h2>
        <p>Welcome back. ☺</p>
        <div className="login-container">
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="email">Email address:</label>
              <input
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="pwd">Password:</label>
              <input
                placeholder="******"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
              />
            </div>
            {error ? (
              <div>
                <p>The user details are incorrect.</p>
              </div>
            ) : null}
            <div>
              <button className="submit-button" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
        <Link to="/signup">
          <p className="text-sub">← Go to Signup</p>
        </Link>
      </div>
    </div>
  );
}

export default Login;
