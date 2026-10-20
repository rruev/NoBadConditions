import { activeCragService } from '../services';
import { useState, useEffect } from 'react';

export default function useActiveCrag(initialFetch = false) {
    const [activeCrags, setActiveCrags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchActiveCrags = async () => {
        try {
            setLoading(true);
            const data = await activeCragService.getAll();
            setActiveCrags(data);
        } catch (err) {
            setError(err);
        } finally {
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
        if (initialFetch) {
            fetchActiveCrags();
        }
        return () => {
            //abort
            setActiveCrags([]);
            setLoading(true);
            setError(null);
        }
    }, [initialFetch]);

    return { activeCrags, loading, error, addToActiveCrags, removeFromActiveCrags };
};