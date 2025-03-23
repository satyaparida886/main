const API_BASE_URL = "http://localhost:5001"; // Backend server URL

// ✅ Generic API Request Function
async function apiRequest(url, method = "GET", body = null) {
    try {
        const options = { method, headers: { "Content-Type": "application/json" } };
        if (body) options.body = JSON.stringify(body);

        const response = await fetch(`${API_BASE_URL}${url}`, options);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error(`API request failed: ${url}`, error);
        return null; // 👈 Prevents UI crashes
    }
}

// ✅ Flights API
export async function getFlights(source, destination, date) {
    return (await apiRequest(`/get-flights?source=${source}&destination=${destination}&date=${date}`)) || [];
}

// ✅ Hotels API
export async function getHotels(destination) {
    return (await apiRequest(`/get-hotels?destination=${destination}`)) || [];
}

// ✅ Best Places API
export async function getBestPlaces(destination) {
    return (await apiRequest(`/get-best-places?destination=${destination}`)) || [];
}

// ✅ Total Expense API (POST Request)
export async function getTotalExpense(data) {
    return (await apiRequest(`/get-total-expense`, "POST", data)) || { totalCost: "N/A" };
}

// ✅ Travel Plan API (POST Request)
export async function getTravelPlan(destination) {
    return (await apiRequest(`/get-plan`, "POST", { destination })) || {};
}
