import styles from './SearchCrag.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Map from '../Map/Map';
import LocationFields from '../LocationFields/LocationFields';
import SearchField from '../SearchField/SearchField';

import useConditions from '../../hooks/useConditions';

export default function SearchCrag() {
    const { fetchAndSetConditions } = useConditions();
    const navigate = useNavigate();
    const [showLocationFields, setShowLocationFields] = useState(true);
    const [location, setLocation] = useState({ lat: null, lon: null });

    const toggleLocationFields = () => setShowLocationFields(prev => !prev);

    const handleLocationChange = (lat, lon) => {
        setLocation({ lat, lon });
    }

    const handleShowConditions = async () => {
        await fetchAndSetConditions(location.lat, location.lon);
        navigate('/result');
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


            {showLocationFields ? <LocationFields {...location} handleLocationChange={handleLocationChange} /> : <SearchField handleSelectCrag={handleLocationChange} />}

            <Map location={location} handleLocationChange={handleLocationChange} />

            <button
                className={styles.submit}
                type="button"
                onClick={handleShowConditions}
            >
                Show climbing conditions
            </button>

        </section>
    );
}