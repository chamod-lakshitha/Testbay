import React from 'react';

const Unauthorize = () => {
  return (
    <>
      <div
        style={{
          with: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <img
          style={{ width: '500px' }}
          src={require('../assets/unauthorize.jpg')}
          alt="bad-req"
        />
        <h1 className="unauthorize-access">Unauthorize access</h1>
      </div>
    </>
  );
};

export default Unauthorize;
