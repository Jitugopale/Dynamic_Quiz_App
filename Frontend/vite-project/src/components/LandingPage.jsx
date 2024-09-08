import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-b from-purple-700 to-indigo-600 p-8">
          <h1 className="text-4xl font-extrabold text-white mb-4 text-center">
            Welcome to Quiz Master
          </h1>
          <p className="text-lg text-gray-100 text-center mb-6">
            Discover new knowledge, challenge yourself, and compete with friends!
          </p>
        </div>
        <div className="p-8">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-6 justify-center">
            {/* Register Button */}
            <Link to="/register">
              <button className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-blue-600 transition duration-300 text-lg">
                Register
              </button>
            </Link>

            {/* Login Button */}
            <Link to="/login">
              <button className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-green-600 transition duration-300 text-lg">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
