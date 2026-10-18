import { getErrors } from '../utils/errors.util';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export const getAll = async () => {
    const response = await fetch(`${API_URL}/crags`, {
        method: 'GET',
        credentials: 'include'
    });
    if (!response.ok) {
        throw await getErrors(response);
    }
    return response.json();
}

export const getById = async (cragId) => {
    const response = await fetch(`${API_URL}/crags/${cragId}`, {
        method: 'GET',
        credentials: 'include'
    });
    if (!response.ok) {
        throw await getErrors(response);
    }
    return response.json();
}

export const create = async (cragData) => {
    const response = await fetch(`${API_URL}/crags`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cragData)
    });
    if (!response.ok) {
        throw await getErrors(response);
    }
    return response.json();
}

export const update = async (cragId, cragData) => {
    const response = await fetch(`${API_URL}/crags/${cragId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cragData)
    });
    if (!response.ok) {
        throw await getErrors(response);
    }
    return response.json();
}

export const remove = async (cragId) => {
    const response = await fetch(`${API_URL}/crags/${cragId}`, {
        method: 'DELETE',
        credentials: 'include'
    });
    if (!response.ok) {
        throw await getErrors(response);
    }
    return response.json();
}