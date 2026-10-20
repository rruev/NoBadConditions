import { useState, useEffect } from 'react';
import { cragService } from '../services';

export default function useCrag(cragId) {
    const [crags, setCrags] = useState(null);
    const [crag, setCrag] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllCrags = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await cragService.getAll();
            setCrags(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const getCrag = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await cragService.getById(cragId);
            setCrag(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const addCrag = async (newCrag) => {
        setLoading(true);
        setError(null);
        try {
            const data = await cragService.create(newCrag);
            setCrags((prevCrags) => [...prevCrags, data]);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const updateCrag = async (updatedCrag) => {
        setLoading(true);
        setError(null);
        try {
            const data = await cragService.update(updatedCrag);
            setCrags((prevCrags) => prevCrags.map((crag) => crag.id === data.id ? data : crag));
            setCrag(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const removeCrag = async () => {
        setLoading(true);
        setError(null);
        try {
            await cragService.delete(cragId);
            setCrags((prevCrags) => prevCrags.filter((crag) => crag.id !== cragId));
            if (crag && crag.id === cragId) {
                setCrag(null);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (cragId) {
            getCrag();
            return;
        }
        getAllCrags();
        return () => {
            //abort
        };
    }, [cragId]);

    return { 
        crags, 
        crag, 
        loading, 
        error,
        addCrag,
        updateCrag,
        removeCrag
     };
}