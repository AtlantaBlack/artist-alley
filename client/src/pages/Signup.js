import React, { useState } from 'react';

/*

1) make sign up form
2) make a function that will set the temporary state of form
3) 

*/

function Signup(props) {
  const [userType, setUserType] = useState('');

  // rendering form
  return (
    <div>
      <div className="userType-container">
        <h2>I am...</h2>
        <button type="button" onClick={() => setUserType('Artist')}>
          An Artist
        </button>
        <button type="button" onClick={() => setUserType('Non-Artist')}>
          A Wizard
        </button>
      </div>

      {userType}

      <div className="signup-container">
        <h2>Enter your details</h2>
        <form>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              placeholder="Username"
              name="username"
              type="username"
              id="username"
            />
          </div>
          <div>
            <label htmlFor="firstName">First name:</label>
            <input
              placeholder="First name"
              name="firstName"
              type="firstName"
              id="firstName"
            />
          </div>

          <div>
            <label htmlFor="lastName">Last name:</label>
            <input
              placeholder="lastName"
              name="lastName"
              type="lastName"
              id="lastName"
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              placeholder="youremail@email.com"
              name="email"
              type="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              placeholder="*****"
              name="password"
              type="password"
              id="password"
            />
          </div>

          <div>
            <label htmlFor="birthday">Birthday:</label>
            <input
              placeholder="DD/MM/YYYY"
              name="birthday"
              type="birthday"
              id="birthday"
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
