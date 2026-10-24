import styles from './ActiveCrags.module.css';
import { useState } from 'react';
import useActiveCrag from '../../../hooks/useActiveCrag';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';

import { Link } from 'react-router';
import { getDailyStats } from '../../../utils/results.util';

import ActiveCragSkeleton from './ActiveCragSkeleton';
import ActiveCrag from '../ActiveCrag/ActiveCrag';

export default function ActiveCrags() {
    const { activeCrags, loading, error, removeFromActiveCrags } = useActiveCrag(true);
    const [dayIndex, setDayIndex] = useState(0);

    const { days } = getDailyStats(activeCrags[0]?.conditions, dayIndex);

    return (
        <section className={styles.page}>
            <div className={styles.container}>
                <header className={styles.heading}>
                    <div>
                        <p className={styles.eyebrow}>Your season</p>
                        <h1>Active crags</h1>
                    </div>

                    <Link to="/mycrags" className={styles.addButton}>
                        <span aria-hidden="true">+</span> Add to active crags
                    </Link>
                </header>

                {loading && <ActiveCragSkeleton />}

                {!loading && error && <ErrorMessage error={error} />}

                {!loading && !error && !activeCrags.length && (
                    <p className={styles.message}>
                        You don't have any active crags yet. Pick some from your <Link to="/mycrags">crags</Link>.
                    </p>
                )}

                {!loading && !error && activeCrags.length > 0 && (
                    <div className={styles.dayNav}>
                        <button
                            type="button"
                            className={styles.dayArrow}
                            aria-label="Previous day"
                            disabled={dayIndex === 0}
                            onClick={() => setDayIndex(dayIndex - 1)}
                        >
                            ‹
                        </button>
                        <div className={styles.dayInfo} aria-live="polite">
                            <strong>{days[dayIndex]}</strong>
                        </div>
                        <button
                            type="button"
                            className={styles.dayArrow}
                            aria-label="Next day"
                            disabled={dayIndex === days.length - 1}
                            onClick={() => setDayIndex(dayIndex + 1)}
                        >
                            ›
                        </button>
                    </div>
                )}

                {!loading && !error && activeCrags.length > 0 && (
                    <ul className={styles.grid}>
                        {activeCrags.map((activeCrag) => (
                            <ActiveCrag
                                key={activeCrag.id}
                                activeCragId={activeCrag.id}
                                crag={activeCrag.crag}
                                conditions={activeCrag.conditions}
                                dayIndex={dayIndex}
                                removeFromActiveCrags={removeFromActiveCrags}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}