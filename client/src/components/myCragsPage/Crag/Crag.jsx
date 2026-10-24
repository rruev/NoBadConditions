import styles from './Crag.module.css';
import useConditions from '../../../hooks/useConditions';
import useActiveCrag from '../../../hooks/useActiveCrag';
import { cragService } from '../../../services';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import Remove from '../../ui/Remove/Remove';

export default function Crag({
    cragId,
    active,
    name,
    city,
    country,
    latitude,
    longitude,
    onRemove,
}) {
    const { fetchAndSetConditions } = useConditions();
    const { addToActiveCrags, removeFromActiveCrags } = useActiveCrag();
    const [showRemove, setShowRemove] = useState(false);
    const [activeState, setActiveState] = useState(active);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const page = 'mycrags';

    const handleCardClick = async () => {
        await fetchAndSetConditions(latitude, longitude, name, city, country, page);
    };

    const handleRemove = async () => {
        await onRemove(cragId);
        setShowRemove(false);
    };

    const handleCloseRemove = () => {
        setShowRemove(false);
    };

    const handleToggleActive = async () => {
        setLoading(true);
        if (activeState) {
            const crag = await cragService.getById(cragId);
            await removeFromActiveCrags(crag.active.id);
            setActiveState(false);
        } else {
            await addToActiveCrags(cragId);
            setActiveState(true);
        }
        setLoading(false);
    }

    return (
        <>
            <button type="button" className={styles.cardMain} onClick={handleCardClick}>
                <span className={styles.cardTop}>
                    <span className={styles.marker} aria-hidden="true">⌖</span>
                    {activeState && <span className={styles.badge}>Active</span>}
                </span>

                <strong className={styles.name}>{name}</strong>
                <span className={styles.region}>{(city && country) ? `${city}, ${country}` : ''}</span>

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
                <button type="button" className={styles.action} onClick={handleToggleActive}>
                    {loading ? 'Loading...' : activeState ? 'Deactivate' : 'Set active'}
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