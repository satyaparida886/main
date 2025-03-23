import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Results() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const destination = queryParams.get("destination");
  const budget = queryParams.get("budget");
  const duration = queryParams.get("duration");

  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const flightRes = await axios.get(`http://localhost:5001/get-flights?destination=${destination}`);
        const hotelRes = await axios.get(`http://localhost:5001/get-hotels?destination=${destination}&budget=${budget}`);
        
        setFlights(flightRes.data || []);
        setHotels(hotelRes.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch travel data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [destination, budget]);

  if (loading) return <div className="text-center mt-10 text-lg font-semibold">⏳ Loading travel data...</div>;
  if (error) return <div className="text-center mt-10 text-red-500 font-semibold">{error}</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Travel Recommendations for {destination}</h2>

      {/* ✈️ Flight Options */}
      <h3 className="text-xl font-semibold mt-6">✈️ Flight Options</h3>
      {flights.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 mt-4">
          {flights.map((flight, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md bg-white">
              <p className="text-lg font-semibold">{flight.airline}</p>
              <p className="text-gray-600">💰 Price: <span className="font-bold">${flight.price}</span></p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-2">No flights available.</p>
      )}

      {/* 🏨 Hotel Options */}
      <h3 className="text-xl font-semibold mt-6">🏨 Hotel Options</h3>
      {hotels.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 mt-4">
          {hotels.map((hotel, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md bg-white">
              <p className="text-lg font-semibold">{hotel.name}</p>
              <p className="text-gray-600">💰 Price per night: <span className="font-bold">${hotel.price}</span></p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-2">No hotels available.</p>
      )}
    </div>
  );
}

export default Results;
