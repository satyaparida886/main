import React, { useState } from "react";
import { getFlights, getHotels, getBestPlaces, getTotalExpense } from "../services/api";
import "../styles/TravelPlanner.css";

const TravelPlanner = () => {
    const [destination, setDestination] = useState("");
    const [budget, setBudget] = useState("");
    const [duration, setDuration] = useState("");
    const [flights, setFlights] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [places, setPlaces] = useState([]);
    const [expense, setExpense] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!destination || !budget || !duration) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setError(""); 

        try {
            const [flightData, hotelData, placeData, totalCost] = await Promise.all([
                getFlights(destination, budget, duration),
                getHotels(destination, budget),
                getBestPlaces(destination),
                getTotalExpense(destination, budget, duration),
            ]);

            setFlights(flightData || []);
            setHotels(hotelData || []);
            setPlaces(placeData || []);
            setExpense(totalCost || "N/A");
        } catch (err) {
            console.error("Error fetching travel data:", err);
            setError("Failed to fetch travel data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2 className="title">🌍 AI Travel Planner</h2>
            
            <div className="input-group">
                <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
                <input type="number" placeholder="Budget ($)" value={budget} onChange={(e) => setBudget(e.target.value)} />
                <input type="number" placeholder="Duration (days)" value={duration} onChange={(e) => setDuration(e.target.value)} />
            </div>

            <button className="search-btn" onClick={handleSearch} disabled={loading}>
                {loading ? "🔄 Searching..." : "Plan Trip"}
            </button>

            {error && <p className="error-message">{error}</p>}
            
            {loading && <p className="loading-message">⏳ Fetching travel recommendations...</p>}

            {!loading && !error && (
                <>
                    <h3>✈️ Flight Recommendations:</h3>
                    <div className="grid-container">
                        {flights.length > 0 ? flights.map((flight, index) => (
                            <div key={index} className="card">
                                <p>{flight.airline} - <strong>${flight.price}</strong></p>
                            </div>
                        )) : <p className="no-data">No flights available.</p>}
                    </div>

                    <h3>🏨 Hotel Recommendations:</h3>
                    <div className="grid-container">
                        {hotels.length > 0 ? hotels.map((hotel, index) => (
                            <div key={index} className="card">
                                <p>{hotel.name} - <strong>${hotel.price}/night</strong></p>
                            </div>
                        )) : <p className="no-data">No hotels available.</p>}
                    </div>

                    <h3>📍 Best Places to Visit:</h3>
                    <div className="grid-container">
                        {places.length > 0 ? places.map((place, index) => (
                            <div key={index} className="card">
                                <p>{place}</p>
                            </div>
                        )) : <p className="no-data">No places found.</p>}
                    </div>

                    <h3 className="expense">💰 Total Estimated Expense: <span>${expense}</span></h3>
                </>
            )}
        </div>
    );
};

export default TravelPlanner;
