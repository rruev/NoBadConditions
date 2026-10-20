import { getErrors } from '../utils/errors.util.js';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

export const getAll = async () => {
    const response = await fetch(`${API_URL}/active-crags`, {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error(getErrors(response));
    }
    return await response.json();
}

export const create = async (cragId) => {
    const response = await fetch(`${API_URL}/active-crags`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cragId }),
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error(getErrors(response));
    }
    return await response.json();
};

export const remove = async (activeCragId) => {
    const response = await fetch(`${API_URL}/active-crags/${activeCragId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error(getErrors(response));
    }
    return await response.json();
};