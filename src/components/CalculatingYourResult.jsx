import React from 'react';

const CalculatingYourResult = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-center">
        <p className="text-2xl md:text-3xl font-light mb-4">
          Please wait...
        </p>
        <p className="text-lg mb-8">
          Calculating your result
        </p>
      </div>
    </div>
  );
};

export default CalculatingYourResult;
