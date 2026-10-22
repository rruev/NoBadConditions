import styles from './ActiveCrag.module.css';
import { useNavigate } from 'react-router';
import useConditions from '../../../hooks/useConditions';
import { getScoreLevel, getDailyStats } from '../../../utils/results.util';

export default function ActiveCrag({
    activeCragId,
    crag,
    conditions,
    dayIndex,
    removeFromActiveCrags
}) {
    const { fetchAndSetConditions } = useConditions();
    const navigate = useNavigate();

    const { bestHour, averageScore } = getDailyStats(conditions, dayIndex);

    const handleCardClick = async (latitude, longitude, name) => {
        navigate('/result');
        await fetchAndSetConditions(latitude, longitude, name);
    };

    return (
        <li key={activeCragId} className={styles.card} >
            <div className={styles.cardHeader}>
                <h2 className={styles.name} >
                    <span className={styles.marker} aria-hidden="true">⌖</span>
                    {crag?.name}
                </h2>
                <div className={styles.actions}>
                    <button type='button' className={styles.view} onClick={() => handleCardClick(crag.latitude, crag.longitude, crag.name)}>View weather</button>
                    <button type="button" className={styles.remove} onClick={() => removeFromActiveCrags(activeCragId)}>Remove from the list</button>
                </div>
            </div>

            <dl className={styles.stats} >
                <div>
                    <dt>Best hour</dt>
                    <dd>{bestHour.time}</dd>
                </div>
                <div>
                    <dt>12h average</dt>
                    <dd className={styles[getScoreLevel(averageScore)]}>{averageScore}</dd>
                </div>
            </dl>

            <div className={styles.chart} role="group" aria-label="Hourly climbing score" >
                {conditions.hourly.map((hour, index) => {
                    if (index < dayIndex * 24 || index >= (dayIndex + 1) * 24) {
                        return null;
                    }
                    const level = getScoreLevel(hour.overallScore);

                    return (
                        <span
                            key={`${hour.date}-${hour.time}`}
                            className={styles.hour}
                            tabIndex={0}
                            aria-label={`${hour.time}:00, climbing score ${hour.overallScore} out of 100`}
                        >
                            <span className={styles.barTrack}>
                                <span
                                    className={`${styles.tooltip} ${styles[level]}`}
                                    style={{ bottom: `calc(${hour.overallScore}% + 6px)` }}
                                >
                                    {hour.overallScore}
                                </span>
                                <span
                                    className={`${styles.bar} ${styles[`${level}Bar`]}`}
                                    style={{ height: `${hour.overallScore}%` }}
                                />
                            </span>
                            <span className={styles.hourLabel}>{hour.time.split(':')[0]}</span>
                        </span>
                    );
                })}
            </div>
        </li>
    );
}