const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;

// ✅ Middleware
app.use(cors({ origin: "http://localhost:5173" })); // Restrict CORS for security
app.use(express.json()); // Parses incoming JSON requests

// ✅ Sample travel data (Replace with real API/database)
const travelPlans = [
    {
        destination: "Paris",
        flights: [{ airline: "Air France", price: 500 }],
        hotels: [{ name: "Hotel Ritz", price: 200 }],
        places: ["Eiffel Tower", "Louvre Museum"],
        totalCost: 700,
    },
    {
        destination: "New York",
        flights: [{ airline: "Delta", price: 400 }],
        hotels: [{ name: "The Plaza", price: 250 }],
        places: ["Statue of Liberty", "Central Park"],
        totalCost: 650,
    },
    {
        destination: "Tokyo",
        flights: [{ airline: "Japan Airlines", price: 600 }],
        hotels: [{ name: "Shinjuku Hotel", price: 180 }],
        places: ["Shibuya Crossing", "Tokyo Tower"],
        totalCost: 780,
    }
];

// ✅ Route to fetch a travel plan (Using POST request)
app.post("/get-plan", async (req, res) => {
    try {
        const { destination } = req.body; 

        if (!destination) {
            return res.status(400).json({ error: "Destination is required!" });
        }

        // 🏷️ Case-insensitive and trimmed search
        const plan = travelPlans.find((p) => p.destination.toLowerCase().trim() === destination.toLowerCase().trim());

        if (plan) {
            res.json(plan);
        } else {
            res.status(404).json({ error: `No travel plan found for "${destination}".` });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Default route (for incorrect endpoints)
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// ✅ Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
