import styles from './SearchField.module.css';
import { usePublicCrags } from '../../hooks/usePublicCrags';
import { useEffect, useState } from 'react';

export default function SearchField({ handleSelectCrag }) {
    const { fetchPublicCrags, loading, error } = usePublicCrags();
    const [publicCrags, setPublicCrags] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchPublicCrags();
            setPublicCrags(data);
        };
        fetchData();
    }, []);

    const handleSearchChange = async (e) => {
        const data = await fetchPublicCrags(e.target.value);
        setPublicCrags(data);
    }

    return (
        <div className={styles.searchContainer}>

            <label htmlFor="crag-search">
                Search for a crag
            </label>

            <div className={styles.inputWrap}>

                <span className={styles.icon}>
                    ⌕
                </span>

                <input
                    id="crag-search"
                    type="text"
                    placeholder="Search by crag name..."
                    autoComplete="off"
                    onChange={handleSearchChange}
                />

            </div>

            <div className={styles.resultsPanel} aria-live="polite">
                {loading ?
                    <div>Loading...</div>
                    :
                    <>
                        <div className={styles.resultsHeading}>
                            <span>Matching crags</span>
                            <span className={styles.resultCount}>{publicCrags.length}</span>
                        </div>

                        {publicCrags.map(crag => (
                            <button
                                key={crag.id}
                                type="button"
                                className={styles.resultItem}
                                onClick={(e) => { e.currentTarget.blur(); handleSelectCrag(crag.latitude, crag.longitude); }}
                            >
                                <span className={styles.resultMarker}>⌖</span>
                                <span className={styles.resultDetails}>
                                    <strong>{crag.name}</strong>
                                    {/* <span>{crag.location}</span> */}
                                </span>
                                {/* <span className={styles.resultDistance}>{crag.distance} mi</span> */}
                            </button>
                        ))}
                    </>
                }
            </div>
        </div>
    );
}