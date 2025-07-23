import React from 'react';

const ErrorMessage = ({ error }) => {
  if (!error) return null;
  return <p className="text-red-500 text-sm mt-1">{error.message}</p>;
};

export default ErrorMessage;
