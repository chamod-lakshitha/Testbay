import { React, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const SignIn = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');

  return (
    <div>
      <div className="sign-in-main-outer">
        <div className="wall-outer">
          <div className="cover-outer"></div>
        </div>
        <div className="form-outer">
          <div className="form-field-outer">
            <div className="title">Sign in</div>
            <div className="title-description">
              Sign in to create a new account
            </div>
            <label style={{ marginTop: '20px' }} htmlFor="f-name">
              Email
            </label>
            <input
              type="text"
              placeholder="first-name :"
              id="f-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="l-name">Last Name</label>
            <input
              type="text"
              placeholder="last-name :"
              id="l-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input // Email is not validated
              type="text"
              placeholder="email :"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="password :"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p
              className="result"
              style={{
                color:
                  result === 'Email is already registered'
                    ? 'orange'
                    : result ===
                      'All fields must be filled without leaving empty'
                    ? 'red'
                    : result ===
                      'Internal server error. try again in few minutes'
                    ? 'red'
                    : result === 'error occurred'
                    ? 'red'
                    : 'green',
              }}
            >
              {result}
            </p>
            <button
              className="btn btn-login"
              onClick={() =>
                axios
                  .post('http://localhost:4000/api/user/sign_in', {
                    firstName,
                    lastName,
                    email,
                    password,
                  })
                  .then((result) => {
                    console.log(result);
                    if (result.data.res === 'email is already registered') {
                      setResult('Email is already registered');
                    } else {
                      if (result.data.error === 'null vales are not accepted') {
                        setResult(
                          'All fields must be filled without leaving empty'
                        );
                      } else {
                        if (result.data.success) {
                          setResult('Sign in successfully');
                          setFirstName('');
                          setLastName('');
                          setEmail('');
                          setPassword('');
                        } else {
                          setResult('error occurred');
                        }
                      }
                    }
                  })
                  .catch((err) => {
                    setResult(
                      'Internal server error. try again in few minutes'
                    );
                  })
              }
            >
              Sign in
            </button>
            <div className="container">
              <p>
                Already have an account?&nbsp;&nbsp;
                <NavLink to="/">Login</NavLink>
              </p>
              <div className="social-media-outer">
                <span className="social-media-icon-1"></span>
                <span className="social-media-icon-2"></span>
                <span className="social-media-icon-3"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
