import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedTopics } = location.state; // Only selectedTopics is passed via state

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.post(
          "https://quizzapp-ard5.onrender.com/api/questions",
          { topics: selectedTopics }
        );
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [selectedTopics]);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = async () => {
    try {
      // Retrieve the userId from localStorage
      const userId = localStorage.getItem("userId");

      const response = await axios.post(
        "https://quizzapp-ard5.onrender.com/api/submit-quiz",
        {
          userId, // Pass the userId from localStorage
          answers: selectedAnswers, // Pass the selected answers
          selectedTopics, // Pass the selected topics
        }
      );

      // Navigate to the results page with the quiz results
      navigate("/results", {
        state: {
          score: response.data.score,
          correctAnswers: response.data.correctAnswers,
          userAnswers: selectedAnswers,
        },
      });
    } catch (error) {
      console.error(
        "Error submitting quiz:",
        error.response?.data?.message || error.message
      );
    }
  };

  if (loading) return <div className="text-center text-white">Loading...</div>;

  if (questions.length === 0)
    return <div className="text-center text-white">No questions available for the selected topics.</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-700 via-teal-800 to-teal-900 text-white p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Question {currentQuestionIndex + 1}/{questions.length}
        </h2>
        <div className="bg-gray-700 p-6 rounded-lg mb-6">
          <p className="text-lg mb-4">{currentQuestion.question}</p>
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg cursor-pointer transition transform hover:scale-105 ${
                  selectedAnswers[currentQuestion._id] === option
                    ? "bg-blue-600 text-white"
                    : "bg-gray-600 text-gray-200 hover:bg-gray-500"
                }`}
                onClick={() => handleAnswerSelect(currentQuestion._id, option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleNextQuestion}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          {currentQuestionIndex < questions.length - 1
            ? "Next Question"
            : "Submit Quiz"}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
