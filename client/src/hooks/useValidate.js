import { useState } from 'react';
import * as z from 'zod';

export default function useValidate(schema) {
    const [error, setError] = useState(null);
    const [touched, setTouched] = useState({});

    const validateInput = async (e, data) => {
        setTouched({
            ...touched,
            [e.target.name]: true
        });

        try {
            await schema.parseAsync(data);
            setError(null);
        } catch (err) {
            const errors = z.flattenError(err).fieldErrors;
            setError(errors || { general: err.message });
        }
    };

    return { validateInput, error, touched };
};