import styles from './SearchField.module.css';
import { usePublicCrags } from '../../../hooks/usePublicCrags';

export default function SearchField({ handleSelectCrag }) {
    const { 
        searchPublicCrags, 
        publicCrags, 
        loading, 
        error 
    } = usePublicCrags();

    const handleSearchChange = (e) => {
        searchPublicCrags(e.target.value);
    };

    const handleClick = (e, crag) => {
        e.currentTarget.blur();
        handleSelectCrag(crag.latitude, crag.longitude, crag.name, crag.city, crag.country);
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
                                onClick={(e) => handleClick(e, crag)}
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