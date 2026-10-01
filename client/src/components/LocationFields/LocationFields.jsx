import styles from './LocationFields.module.css';
import { useEffect, useState } from 'react';
export default function LocationFields({
    lat,
    lon,
    handleLocationChange
}) {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setInputValue((lat && lon) ? `${lat}, ${lon}` : '');
    }, [lat, lon]);

    const handleChange = (event) => {
        setInputValue(event.target.value);

        if (!event.target.value.includes(',')) return;

        const [newLat, newLon] = event.target.value.split(',').map(v => parseFloat(v.trim()));

        if (isNaN(newLat) || isNaN(newLon)) return;

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
                    />

                </div>

            </div>


            {/* <div className={styles.field}>

                <label htmlFor="longitude">
                    Longitude
                </label>

                <div className={styles['input-wrap']}>

                    <span>⌖</span>

                    <input
                        id="longitude"
                        type="number"
                        step="any"
                        placeholder="e.g. 13.0550"
                        value={lon}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                </div>

            </div> */}


            {/* <div className={styles.field}>

                <label htmlFor="elevation">
                    Elevation (m)
                </label>

                <div className={styles['input-wrap']}>

                    <span>△</span>

                    <input
                        id="elevation"
                        type="number"
                        step="1"
                        placeholder="e.g. 1200"
                    />

                </div>

            </div> */}

        </div>
    );
}