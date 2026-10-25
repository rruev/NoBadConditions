import { useState, useEffect } from 'react';
import { cragService } from '../services';

export default function useCrag(cragId, isEdit) {
    const [crags, setCrags] = useState([]);
    const [crag, setCrag] = useState({
        name: '',
        city: '',
        country: '',
        latitude: '',
        longitude: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllCrags = async (signal) => {
        setLoading(true);
        setError(null);
        try {
            const data = await cragService.getAll(signal);
            setCrags(data);
        } catch (err) {
            if (err.name === 'AbortError') return;
            setError(err);
        } finally {
            if (signal && signal.aborted) return;
            setLoading(false);
        }
    };

    const getCrag = async (signal) => {
        setLoading(true);
        setError(null);
        try {
            const data = await cragService.getById(cragId, signal);
            setCrag(data);
        } catch (err) {
            if (err.name === 'AbortError') return;
            setError(err);
        } finally {
            if (signal && signal.aborted) return;
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
            const data = await cragService.update(cragId, updatedCrag);
            setCrags((prevCrags) => prevCrags.map((crag) => crag.id === data.id ? data : crag));
            setCrag(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const removeCrag = async (cragId) => {
        setLoading(true);
        setError(null);
        try {
            await cragService.remove(cragId);
            setCrags((prevCrags) => prevCrags.filter((crag) => crag.id !== cragId));
            if (crag && crag.id === cragId) {
                setCrag({
                    name: '',
                    city: '',
                    country: '',
                    latitude: '',
                    longitude: ''
                });
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isEdit === false ) return;

        const controller = new AbortController();
        const signal = controller.signal;

        if (cragId) {
            getCrag(signal);
        } else {
            getAllCrags(signal);
        }
        return () => {
            controller.abort();
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