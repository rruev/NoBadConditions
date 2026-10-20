import styles from './Crag.module.css';
import useConditions from '../../../hooks/useConditions';
import useCrag from '../../../hooks/useCrag';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import Remove from '../../ui/Remove/Remove';

export default function Crag({
    cragId,
    active,
    name,
    region,
    latitude,
    longitude,
    onRemove,
}) {
    const { fetchAndSetConditions } = useConditions();
    const [showRemove, setShowRemove] = useState(false);

    const navigate = useNavigate();

    const handleCardClick = async () => {
        await fetchAndSetConditions(latitude, longitude, name);
        navigate('/result');
    };

    const handleRemove = async () => {
        await onRemove(cragId);
        setShowRemove(false);
    };

    const handleCloseRemove = () => {
        setShowRemove(false);
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
                <button type="button" className={styles.action} onClick={() => { navigate(`${cragId}`) }}>Edit</button>
                <button type="button" className={styles.action}>
                    {active ? 'Deactivate' : 'Set active'}
                </button>
                <button type="button" className={`${styles.action} ${styles.danger}`} onClick={() => setShowRemove(true)}>Remove</button>
            </div>
            {showRemove && <Remove
                onConfirm={handleRemove}
                onClose={handleCloseRemove}
                title="Remove Crag"
                description="Are you sure you want to remove this crag from your list? This will delete all associated data."
                confirmLabel="Remove"
            />}
        </>
    );
}