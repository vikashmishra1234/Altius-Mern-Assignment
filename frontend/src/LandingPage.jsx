import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white">
      <div className="text-center max-w-2xl">
        {/* Header Section */}
        <h1 className="text-5xl font-bold mb-6">Welcome to the Helpdesk App</h1>
        <p className="text-xl mb-10">
          Manage tickets, assist customers, and streamline your support with ease.
        </p>

        {/* Call to Action: Registration Buttons */}
        <div className="flex flex-col gap-5 md:flex-row justify-center space-x-4">
          {/* Register as Customer */}
          <Link
            to="/register-customer"
            className="bg-white text-blue-500 py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-100 transition"
          >
            Continue as Customer
          </Link>

          {/* Register as Agent */}
          <Link
            to="/register-agent"
            className="bg-white text-green-500 py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:bg-green-100 transition"
          >
            Continue as Agent
          </Link>

          {/* Register as Admin */}
          <Link
            to="/register-admin"
            className="bg-white text-red-500 py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:bg-red-100 transition"
          >
            Continue as Admin
          </Link>
        </div>

        {/* Login link */}
        <div className="mt-10">
          {/* <Link
            to="/login"
            className="text-white text-lg underline hover:text-gray-200 transition"
          >
            Already have an account? Login
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
