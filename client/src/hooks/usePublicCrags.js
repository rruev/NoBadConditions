import { useEffect, useState } from 'react';
import { getPublicCrags } from '../services/publicCrag.service';

export const usePublicCrags = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPublicCrags = async (search='') => {
        try {
            const data = await getPublicCrags(search);
            return data;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { 
        fetchPublicCrags,
        loading, 
        error
    };
};