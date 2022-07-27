import React, { useState } from 'react';

/*

1) make sign up form
2) make a function that will set the temporary state of form
3) 

*/

function Signup(props) {
  // set local state for userType
  const [userType, setUserType] = useState('');
  const [formState, setFormState] = useState({ email: '', password: '' });

  // CURRENTLY ONLY CONSOLE LOGGING THE SIGNUP RESPONSES
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await {
      email: formState.email,
      password: formState.password,
      username: formState.username,
      firstName: formState.firstName,
      lastName: formState.lastName,
      birthday: formState.birthday,
      userType: userType
    };
    // add auths and stuff here also
    console.log(response);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  // rendering form
  return (
    <div>
      {/* if there is no user type defined, then show this first container that asks what type of user they are */}
      {!userType && (
        <div className="userType-container">
          <h2>I am...</h2>
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
        <div className="signup-container">
          {/* this here for testing the local state */}
          <p>the user is a(n):</p>
          {userType}

          <h2>Enter your details</h2>
          <form>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                placeholder="Username"
                name="username"
                type="username"
                id="username"
                onChange={handleInputChange}
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
              />
            </div>

            <div>
              <label htmlFor="birthday">Birthday:</label>
              <input
                placeholder="DD/MM/YYYY"
                name="birthday"
                type="birthday"
                id="birthday"
                onChange={handleInputChange}
              />
            </div>
            <div>
              {/* CHANGE THIS TO TYPE=SUBMIT LATER */}
              <button type="button" onClick={handleFormSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Signup;
