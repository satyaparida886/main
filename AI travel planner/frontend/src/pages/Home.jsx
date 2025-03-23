import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/results?destination=${destination}&budget=${budget}&duration=${duration}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-2xl w-96">
        <h1 className="text-3xl font-bold text-center text-blue-600">AI Travel Planner</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Destination"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setDestination(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Budget"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setBudget(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Duration (Days)"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setDuration(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold transition-all duration-300 hover:bg-blue-600 active:scale-95"
          >
            Find Travel Plan
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
