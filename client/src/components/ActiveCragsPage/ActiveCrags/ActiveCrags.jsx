import styles from './ActiveCrags.module.css';
import useActiveCrag from '../../../hooks/useActiveCrag';
import useConditions from '../../../hooks/useConditions';
import ActiveCragSkeleton from './ActiveCragSkeleton';
import { getScoreLevel } from '../../../utils/results.util';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { getDate } from '../../../utils/results.util';

// Placeholder data until the real scores are wired in.
const BEST_WINDOW = '10:00 – 13:00';
const AVERAGE_SCORE = 78;
const DAYS_COUNT = 7;
const HOURLY_SCORES = [
    { time: '08', score: 54 },
    { time: '09', score: 66 },
    { time: '10', score: 82 },
    { time: '11', score: 91 },
    { time: '12', score: 94 },
    { time: '13', score: 88 },
    { time: '14', score: 79 },
    { time: '15', score: 72 },
    { time: '16', score: 63 },
    { time: '17', score: 48 },
    { time: '18', score: 36 },
    { time: '19', score: 24 },
];

export default function ActiveCrags() {
    const { activeCrags, loading, error, removeFromActiveCrags } = useActiveCrag(true);
    const { fetchAndSetConditions } = useConditions();
    const [dayIndex, setDayIndex] = useState(0);

    const navigate = useNavigate();

    const handleCardClick = async (latitude, longitude, name) => {
        navigate('/result');
        await fetchAndSetConditions(latitude, longitude, name);
    };

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

                {!loading && error && (
                    <p className={styles.message} role="alert">{error.message}</p>
                )}

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
                            <strong>{getDate(dayIndex)}</strong>
                        </div>
                        <button
                            type="button"
                            className={styles.dayArrow}
                            aria-label="Next day"
                            disabled={dayIndex === DAYS_COUNT - 1}
                            onClick={() => setDayIndex(dayIndex + 1)}
                        >
                            ›
                        </button>
                    </div>
                )}

                {!loading && !error && activeCrags.length > 0 && (
                    <ul className={styles.grid}>
                        {activeCrags.map((activeCrag) => (
                            <li key={activeCrag.id} className={styles.card} onClick={() => handleCardClick(activeCrag.crag.latitude, activeCrag.crag.longitude, activeCrag.crag.name)}>
                                <div className={styles.cardHeader}>
                                    <h2 className={styles.name}>
                                        <span className={styles.marker} aria-hidden="true">⌖</span>
                                        {activeCrag.crag?.name}
                                    </h2>
                                    <button type="button" className={styles.remove} onClick={() => removeFromActiveCrags(activeCrag.id)}>Remove</button>
                                </div>

                                <dl className={styles.stats}>
                                    <div>
                                        <dt>Best window</dt>
                                        <dd>{BEST_WINDOW}</dd>
                                    </div>
                                    <div>
                                        <dt>12h average</dt>
                                        <dd className={styles[getScoreLevel(AVERAGE_SCORE)]}>{AVERAGE_SCORE}</dd>
                                    </div>
                                </dl>

                                <div className={styles.chart} role="group" aria-label="Hourly climbing score">
                                    {HOURLY_SCORES.map(({ time, score }) => {
                                        const level = getScoreLevel(score);

                                        return (
                                            <span
                                                key={time}
                                                className={styles.hour}
                                                tabIndex={0}
                                                aria-label={`${time}:00, climbing score ${score} out of 100`}
                                            >
                                                <span className={styles.barTrack}>
                                                    <span
                                                        className={`${styles.tooltip} ${styles[level]}`}
                                                        style={{ bottom: `calc(${score}% + 6px)` }}
                                                    >
                                                        {score}
                                                    </span>
                                                    <span
                                                        className={`${styles.bar} ${styles[`${level}Bar`]}`}
                                                        style={{ height: `${score}%` }}
                                                    />
                                                </span>
                                                <span className={styles.hourLabel}>{time}</span>
                                            </span>
                                        );
                                    })}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}