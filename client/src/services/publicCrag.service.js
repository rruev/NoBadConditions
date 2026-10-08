const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

export const getPublicCrags = async (search) => {
    const response = await fetch(`${API_URL}/public-crags?search=${encodeURIComponent(search)}`);
    if (!response.ok) {
        throw new Error('Failed to fetch public crags');
    }
    return response.json();
};