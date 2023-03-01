import React from 'react';

const BadRequest = () => {
  return (
    <div
      style={{
        with: '100%',
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        style={{ width: '500px' }}
        src={require('../assets/bad-req.png')}
        alt="bad-req"
      />
    </div>
  );
};

export default BadRequest;
