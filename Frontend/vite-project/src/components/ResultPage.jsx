import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, correctAnswers, userAnswers } = location.state || {
    score: 0,
    correctAnswers: [],
    userAnswers: {},
  };

  // Filter correctAnswers to only include those from the selected topics
  const filteredAnswers = correctAnswers.filter((item) =>
    userAnswers.hasOwnProperty(item.questionId)
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Quiz Results</h2>
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-center">
          Your Score: {score}
        </h3>
        <div className="mt-4">
          {filteredAnswers.map((item, index) => (
            <div
              key={index}
              className={`mb-4 p-4 rounded-lg ${
                userAnswers[item.questionId] === item.correctAnswer
                  ? "bg-gray-800" // correct answers
                  : "bg-red-800" // incorrect answers
              }`}
            >
              <p className="text-md font-medium">{item.question}</p>
              <p className="text-sm text-gray-400">
                Your Answer: {userAnswers[item.questionId] || "No answer"}
              </p>
              <p className="text-sm text-green-500">
                Correct Answer: {item.correctAnswer}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Go to Home
        </button>
        <button
          onClick={() => navigate("/leaderboard")}
          className="ml-4 px-6 py-3 bg-yellow-400 text-white rounded-lg hover:bg-yellow-600 transition"
        >
          View Leaderboard
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
