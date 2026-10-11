import styles from './ResultChart.module.css';
import shared from '../../../styles/shared.module.css';
import { getScoreLevel } from '../../../utils/results.util';
import ScoreOverview from '../ScoreOverview/ScoreOverview';

export default function ResultChart({
    hourlyForecast,
    days,
    dayIndex,
    setDayIndex,
    selectedHourIndex,
    setSelectedHourIndex,
}) {
    return (
            <section className={styles.chartSection} aria-labelledby="chart-title">
                <div className={styles.chartHeader}>
                    <div>
                        <p className={shared.sectionEyebrow}>HOUR BY HOUR</p>
                        <h2 id="chart-title">Climbing score</h2>
                    </div>
                    <div className={styles.scoreLegend} aria-label="Score ranges">
                        <span><i className={styles.legendExcellent} /> Excellent</span>
                        <span><i className={styles.legendGood} /> Good</span>
                        <span><i className={styles.legendFair} /> Fair</span>
                    </div>
                </div>

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
                        <span>{hourlyForecast[dayIndex * 24]?.date}</span>
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

                <div className={styles.chart}>
                    <div className={styles.axisLabels} aria-hidden="true">
                        <span>100</span>
                        <span>75</span>
                        <span>50</span>
                        <span>25</span>
                    </div>
                    <div className={styles.hourlyBars}>
                        {hourlyForecast.map((hour, index) => {
                            if (index < dayIndex * 24 || index >= (dayIndex + 1) * 24) {
                                return null;
                            }
                            const level = getScoreLevel(hour.overallScore);
                            const selected = selectedHourIndex === index;

                            return (
                                <button
                                    key={`${hour.date}-${hour.time}`}
                                    type="button"
                                    className={`${styles.hourButton} ${selected ? styles.selectedHour : ''}`}
                                    aria-label={`${hour.time}, climbing score ${hour.overallScore} out of 100`}
                                    aria-pressed={selected}
                                    onClick={() => setSelectedHourIndex(index)}
                                >
                                    <span className={styles.barTrack} style={{ '--score-height': `${hour.overallScore}%` }}>
                                        <span className={`${styles.scoreTooltip} ${styles[level]}`}>
                                            {hour.overallScore}
                                        </span>
                                        <span
                                            className={`${styles.scoreBar} ${styles[`${level}Bar`]}`}
                                            style={{ height: `${hour.overallScore}%` }}
                                        />
                                    </span>
                                    <span className={styles.hourLabel}>{hour.time}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

            </section>
    );
}