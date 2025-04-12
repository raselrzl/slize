import Link from 'next/link';
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 px-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link
        href="/"
        className="px-6 py-2 text-white bg-gray-700 hover:bg-gray-600 rounded-md transition duration-200"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
