import React, { useState } from 'react';
import '../styles.scss';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';

const LogIn = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const navigate = useNavigate();

  return (
    <div className="login-main-outer">
      <div className="form-outer">
        <div className="form-field-outer">
          <div className="title">Login</div>
          <div className="title-description">
            login to your existing account
          </div>
          <button className="btn">
            <span className="google-logo"></span>Login with the Google account
          </button>
          <div className="separator-outer">
            <div className="separator"></div>
            <div className="separator-content">or login with email</div>
            <div className="separator"></div>
          </div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="email :"
            id="email"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password :"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="item-container">
            <div className="remember-me-container">
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox" className="remember-me">
                Remember me
              </label>
            </div>
            <a href="https://pluralsight.com">forgot password?</a>
          </div>
          <p
            className="result"
            style={{ color: result === 'login success' ? 'green' : 'red' }}
          >
            {result}
          </p>
          <button
            className="btn btn-login"
            onClick={() =>
              axios
                .post('http://localhost:4000/api/user', {
                  email: userName,
                  password: password,
                })
                .then((res) => {
                  if (res.data.success === 'true') {
                    localStorage.setItem('token', res.data.token);
                    setResult('');
                    navigate('/dashboard');
                  } else {
                    setResult('Incorrect email or password');
                  }
                })
                .catch((err) => {
                  setResult('Internal server error. try again in few minutes');
                })
            }
          >
            Login
          </button>
          <p>
            Not registered yet?&nbsp;&nbsp;
            <NavLink to="/sign_in">create account</NavLink>
          </p>
        </div>
      </div>
      <div className="wall-outer">
        <div className="cover-outer"></div>
      </div>
    </div>
  );
};

export default LogIn;
