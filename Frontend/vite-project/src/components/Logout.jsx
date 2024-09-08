import React from "react";
import { useNavigate } from "react-router-dom";

const LayoutWithLogout = ({ children }) => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    // Clear token and userId
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar with Logout Button */}
      <header className="bg-gray-900 text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* App Title or Logo */}
          <h1 className="text-2xl font-bold">Quiz App</h1>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 bg-gray-800 text-white">
        {/* Render children components (like TopicSelection, QuizPage, etc.) */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-4 mt-4">
        &copy; 2024 Quiz App. All Rights Reserved.
      </footer>
    </div>
  );
};

export default LayoutWithLogout;
