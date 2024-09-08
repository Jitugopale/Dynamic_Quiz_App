// components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  // If the token exists, render the element (e.g., TopicSelection, QuizPage, etc.)
  // If not, redirect to login
  return token ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
