const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

export const getAll = async (search, signal) => {
    const response = await fetch(`${API_URL}/public-crags?search=${encodeURIComponent(search)}`, { signal });
    if (!response.ok) {
        throw new Error('Failed to fetch public crags');
    }
    const data = await response.json();
    return data;
};