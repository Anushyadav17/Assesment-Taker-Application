import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-500">404</h1>
        <p className="text-2xl md:text-3xl font-light mb-4">
          Oops! Page not found.
        </p>
        <p className="text-lg mb-8">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-200 rounded-lg hover:bg-blue-300"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default Error;
