import { useState, useEffect } from 'react';
import { cragService } from '../services';

export default function useCrag(cragId, isEdit) {
    const [crags, setCrags] = useState([]);
    const [crag, setCrag] = useState({
        name: '',
        latitude: '',
        longitude: ''
    });
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