import styles from './SearchCrag.module.css';
import { useState } from 'react';
import Map from '../Map/Map';
import LocationFields from '../LocationFields/LocationFields';
import SearchField from '../SearchField/SearchField';

import useConditions from '../../../hooks/useConditions';

export default function SearchCrag() {
    const { fetchAndSetConditions, error, setError } = useConditions();
    const [showLocationFields, setShowLocationFields] = useState(true);
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [cragName, setCragName] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const page = 'home';

    const toggleLocationFields = () => setShowLocationFields(prev => !prev);

    const handleLocationChange = (lat, lon, cragName="", city="", country="") => {
        setLocation({ lat, lon });
        setCragName(cragName);
        setCity(city);
        setCountry(country);
    }

    const handleShowConditions = async () => {
        await fetchAndSetConditions(location.lat, location.lon, cragName, city, country, page);
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


            {showLocationFields ? <LocationFields {...location} handleLocationChange={handleLocationChange} error={error} setError={setError} /> : <SearchField handleSelectCrag={handleLocationChange} />}

            <Map location={location} handleLocationChange={handleLocationChange} />

            <button
                className={styles.submit}
                type="button"
                disabled={error}
                onClick={handleShowConditions}
            >
                Show climbing conditions
            </button>

        </section>
    );
}