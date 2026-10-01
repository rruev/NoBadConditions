import styles from './SearchCrag.module.css';
import { useState } from 'react';
import Map from '../Map/Map';
import LocationFields from '../LocationFields/LocationFields';
import SearchField from '../SearchField/SearchField';

export default function SearchCrag() {
    const [showLocationFields, setShowLocationFields] = useState(true);
    const [location, setLocation] = useState({lat: null, lon: null});

    const toggleLocationFields = () => setShowLocationFields(prev => !prev);

    const handleLocationChange = (lat, lon) => {
        setLocation({ lat, lon });
    }

    return (
        <section className={styles['search-card']}>

            <div className={styles['mode-switch']}>

                <button
                    className={`${styles['mode-option']} ${showLocationFields ? styles.active : ''}`}
                    onClick={toggleLocationFields}
                >
                    ⌖ &nbsp; Find by location
                </button>

                <button
                    className={`${styles['mode-option']} ${!showLocationFields ? styles.active : ''}`}
                    onClick={toggleLocationFields}
                >
                    ⌖ &nbsp; Choose existing crag
                </button>

            </div>


            {showLocationFields ? <LocationFields {...location} handleLocationChange={handleLocationChange} /> : <SearchField />}

            <Map location={location} handleLocationChange={handleLocationChange} />

            <button
                className={styles.submit}
                type="button"
            >
                Show climbing conditions
            </button>

        </section>
    );
}