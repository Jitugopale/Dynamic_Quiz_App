import React, { useState, useEffect } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/leaderboard"
        );
        setLeaderboard(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <div className="text-center text-white text-2xl">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-12 px-4">
      <h2 className="text-4xl font-extrabold mb-10 text-center">Leaderboard</h2>
      <div className="max-w-4xl mx-auto bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-lg">
        <table className="min-w-full table-auto text-left text-lg">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr
                key={user._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } hover:bg-gray-600 transition-all`}
              >
                <td className="border-b border-gray-600 px-6 py-4">
                  {index + 1}
                </td>
                <td className="border-b border-gray-600 px-6 py-4">
                  {user.name}
                </td>
                <td className="border-b border-gray-600 px-6 py-4">
                  {user.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
