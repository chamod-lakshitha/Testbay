import { React, useEffect, useState } from 'react';
import axios from 'axios';
import Unauthorize from './unauthorize';
import { useNavigate } from 'react-router';

const SignOut = () => {
  const [unauthorizeLogin, setUnauthorizeLogin] = useState(false);
  const [serverError, setServerError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/user/sign_out', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.data.success) {
          localStorage.clear();
          navigate('/');
        } else {
          if (res.data.err === 'unauthorize access') {
            setUnauthorizeLogin(true);
          }
        }
      })
      .catch((err) => {
        setServerError(true);
      });
  });

  if (unauthorizeLogin) {
    return <Unauthorize />;
  } else {
    if (serverError) {
      return (
        <div className="server-error">
          <h2>server error</h2>
        </div>
      );
    }
  }
};

export default SignOut;
