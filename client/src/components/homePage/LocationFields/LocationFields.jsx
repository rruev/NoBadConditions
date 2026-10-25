import styles from './LocationFields.module.css';
import { isValidCoordinates } from '../../../utils/location.utils';
import { useEffect, useState } from 'react';
export default function LocationFields({
    lat,
    lon,
    handleLocationChange,
    error,
    setError
}) {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setError(null);
        setInputValue((lat && lon) ? `${lat}, ${lon}` : '');
    }, [lat, lon, setError]);
    
    const handleChange = (event) => {
        setError(null);
        setInputValue(event.target.value);
        
        if (!event.target.value.includes(',')) {
            setError(new Error("Coordinates must be in 'lat, lon' format. There should be a coma separating them."));
            return;
        };
        
        const [newLat, newLon] = event.target.value.split(',').map(v => parseFloat(v.trim()));
        
        if (!isValidCoordinates(newLat, newLon)) {
            setError(new Error("Invalid coordinates"));
            return;
        }

        handleLocationChange(newLat, newLon);
    };

    return (
        <div className={styles.fields}>

            <div className={styles.field}>

                <label htmlFor="latitude">
                    Location
                </label>

                <div className={styles['input-wrap']}>

                    <span>⌖</span>

                    <input
                        id="location"
                        type="string"
                        step="any"
                        placeholder="latitude, longitude"
                        value={inputValue}
                        onChange={handleChange}
                        aria-invalid={Boolean(error)}
                    />

                </div>

                {error && (
                    <p className={styles.error} role="alert">
                        <span aria-hidden="true">!</span>
                        {error.message}
                    </p>
                )}

            </div>

        </div>
    );
}