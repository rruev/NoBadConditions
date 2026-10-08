const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

export const fetchConditions = async (lat, lon) => {
    const response = await fetch(`${API_URL}/conditions?lat=${lat}&lon=${lon}`);
    if (!response.ok) {
        throw new Error('Failed to fetch conditions');
    }
    return response.json();
};