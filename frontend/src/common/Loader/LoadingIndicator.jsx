import React from 'react';
import Loader from 'react-loader-spinner';

const LoadingIndicator = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '200px',
        position: 'relative',
      }}
    >
      <Loader
        type="TailSpin"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        color="#e4e9ef"
      />
    </div>
  );
};

export function isLoading(array) {
  if (array === undefined || array.length === 0) {
    return true;
  }

  return false;
}

export default LoadingIndicator;
