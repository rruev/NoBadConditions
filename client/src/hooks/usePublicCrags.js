import { useEffect, useState, useRef } from 'react';
import { publicCragService } from '../services';


export const usePublicCrags = () => {
    const [publicCrags, setPublicCrags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const abortControllerRef = useRef(null);

    const fetchPublicCrags = async (search = '') => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;
        const signal = controller.signal;
        setLoading(true);
        setError(null);

        try {
            const data = await publicCragService.getAll(search, signal);
            setPublicCrags(data);
        } catch (err) {
            setError(err);
        } finally {
            if (abortControllerRef.current === controller) {
                setLoading(false);
            }
        }
    };

    const searchPublicCrags = async (search) => {
        await fetchPublicCrags(search);
    }

    useEffect(() => {
        fetchPublicCrags();
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);


    return {
        fetchPublicCrags,
        searchPublicCrags,
        publicCrags,
        loading,
        error
    };
};