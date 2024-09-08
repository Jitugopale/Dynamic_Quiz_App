import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TopicSelection = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(
          "https://quizzapp-ard5.onrender.com/api/topics/select"
        );
        const uniqueTopics = Array.from(
          new Set(response.data.map((topic) => topic.topic))
        ).map((topic) => {
          return {
            topic: topic,
            ...response.data.find((t) => t.topic === topic),
          };
        });
        setTopics(uniqueTopics);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };
    fetchTopics();
  }, []);

  const handleTopicSelection = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSubmit = () => {
    if (selectedTopics.length === 0) {
      alert("Please select at least one topic.");
    } else {
      navigate("/questions", { state: { selectedTopics } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 flex flex-col items-center justify-center p-8">
      <h2 className="text-4xl font-extrabold text-white mb-8 text-center">
        Choose Your Topics
      </h2>
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topics.map((topic) => (
          <div
            key={topic.topic}
            className={`p-6 rounded-lg shadow-lg transition-transform transform ${
              selectedTopics.includes(topic.topic)
                ? "bg-blue-600 text-white scale-105"
                : "bg-white text-gray-800 hover:scale-105"
            } cursor-pointer flex flex-col items-center justify-center border border-gray-200`}
            onClick={() => handleTopicSelection(topic.topic)}
          >
            <h3 className="text-xl font-semibold mb-2">{topic.topic}</h3>
            <p className="text-sm">Click to select</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <button
          onClick={handleSubmit}
          className="px-8 py-4 bg-green-500 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-green-600 transition"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default TopicSelection;
