import { getErrors } from '../utils/errors.util';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export const register = async (userData) => {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    if (!response.ok) {
        throw await getErrors(response);
    }
    return response.json();
}

export const login = async (userData) => {
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    if (!response.ok) {
        throw await getErrors(response);
    }
    return response.json();
}

export const logout = async () => {
    const response = await fetch(`${API_URL}/users/logout`, {
        method: 'GET',
        credentials: 'include'
    });
    if (!response.ok) {
        throw await getErrors(response);
    }
    return response.json();
}

export const getUser = async () => {
    const response = await fetch(`${API_URL}/users/me`, {
        method: 'GET',
        credentials: 'include'
    });
    if (!response.ok) {
        throw await getErrors(response);
    }
    return response.json();
}

export const update = async (userData) => {
    const response = await fetch(`${API_URL}/users/me`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    if (!response.ok) {
        throw await getErrors(response);
    }
    return response.json();
}

export const remove = async () => {
    const response = await fetch(`${API_URL}/users/me`, {
        method: 'DELETE',
        credentials: 'include'
    });
    if (!response.ok) {
        throw await getErrors(response);
    }
    return response.json();
}