import { activeCragService } from '../services';
import { useState, useEffect } from 'react';

export default function useActiveCrag(initialFetch = false) {
    const [activeCrags, setActiveCrags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchActiveCrags = async (signal) => {
        try {
            setLoading(true);
            const data = await activeCragService.getAll(signal);
            setActiveCrags(data);
        } catch (err) {
            if (err.name === 'AbortError') return;
            setError(err);
        } finally {
            if (signal && signal.aborted) return;
            setLoading(false);
        }
    };

    const addToActiveCrags = async (cragId) => {
        try {
            setLoading(true);
            const newActiveCrag = await activeCragService.create(cragId);
            setActiveCrags((prev) => [...prev, newActiveCrag]);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const removeFromActiveCrags = async (activeCragId) => {
        try {
            setLoading(true);
            await activeCragService.remove(activeCragId);
            setActiveCrags((prev) => prev.filter((crag) => crag.id !== activeCragId));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        if (initialFetch) {
            fetchActiveCrags(signal);
        }
        return () => {
            controller.abort();
        }
    }, [initialFetch]);

    return { activeCrags, loading, error, addToActiveCrags, removeFromActiveCrags };
};