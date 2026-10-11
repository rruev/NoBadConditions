import styles from './ResultChart.module.css';
import shared from '../../../styles/shared.module.css';

export default function ResultChart({
    hourlyForecast,
    selectedHourIndex,
    setSelectedHourIndex,
    getScoreLevel,
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

                <div className={styles.chart}>
                    <div className={styles.axisLabels} aria-hidden="true">
                        <span>100</span>
                        <span>75</span>
                        <span>50</span>
                        <span>25</span>
                    </div>
                    <div className={styles.hourlyBars}>
                        {hourlyForecast.map((hour, index) => {
                            const level = getScoreLevel(hour.score);
                            const selected = selectedHourIndex === index;

                            return (
                                <button
                                    key={hour.time}
                                    type="button"
                                    className={`${styles.hourButton} ${selected ? styles.selectedHour : ''}`}
                                    aria-label={`${hour.time}, climbing score ${hour.score} out of 100`}
                                    aria-pressed={selected}
                                    onClick={() => setSelectedHourIndex(index)}
                                >
                                    <span className={styles.barTrack} style={{ '--score-height': `${hour.score}%` }}>
                                        <span className={`${styles.scoreTooltip} ${styles[level]}`}>
                                            {hour.score}
                                        </span>
                                        <span
                                            className={`${styles.scoreBar} ${styles[`${level}Bar`]}`}
                                            style={{ height: `${hour.score}%` }}
                                        />
                                    </span>
                                    <span className={styles.hourLabel}>{hour.shortTime}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

            </section>
    );
}