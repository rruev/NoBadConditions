import styles from './Crag.module.css';
import useCrag from '../../../hooks/useCrag';
import useConditions from '../../../hooks/useConditions';
import { useNavigate } from 'react-router';

export default function Crag({
    cragId,
    active,
    name,
    region,
    latitude,
    longitude
 }) {
    const { fetchAndSetConditions } = useConditions();

    const navigate = useNavigate();

    const handleCardClick = async () => {
        await fetchAndSetConditions(latitude, longitude, name);
        navigate('/result');
    };

    return (
        <>
            <button type="button" className={styles.cardMain} onClick={handleCardClick}>
                <span className={styles.cardTop}>
                    <span className={styles.marker} aria-hidden="true">⌖</span>
                    {active && <span className={styles.badge}>Active</span>}
                </span>

                <strong className={styles.name}>{name}</strong>
                <span className={styles.region}>{region}</span>

                <dl className={styles.meta}>
                    <div>
                        <dt>Lat</dt>
                        <dd>{latitude}</dd>
                    </div>
                    <div>
                        <dt>Lon</dt>
                        <dd>{longitude}</dd>
                    </div>
                </dl>
            </button>

            <div className={styles.actions}>
                <button type="button" className={styles.action} onClick={() => {navigate(`${cragId}`)}}>Edit</button>
                <button type="button" className={styles.action}>
                    {active ? 'Deactivate' : 'Set active'}
                </button>
                <button type="button" className={`${styles.action} ${styles.danger}`}>Remove</button>
            </div>
        </>
    );
}