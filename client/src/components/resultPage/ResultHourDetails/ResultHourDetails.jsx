import styles from './ResultHourDetails.module.css';
import shared from '../../../styles/shared.module.css';

export default function ResultHourDetails({ selectedHour, getScoreLevel, scoreFactors }) {
    return (
        <section className={styles.hourDetails} aria-live="polite" aria-labelledby="hour-details-title">
            <div className={styles.detailsHeader}>
                <div>
                    <p className={shared.sectionEyebrow}>SELECTED HOUR</p>
                    <h2 id="hour-details-title">{selectedHour.time}</h2>
                </div>
                <span className={`${styles.conditionBadge} ${styles[getScoreLevel(selectedHour.score)]}`}>
                    {selectedHour.condition}
                </span>
            </div>

            <div className={styles.hourSummary}>
                <div className={styles.hourWeather}>
                    <div className={styles.hourTemperature}>{selectedHour.temperature}<span>°</span></div>
                    <div className={styles.hourWeatherStats}>
                        <div><span>Humidity</span><strong>{selectedHour.humidity}%</strong></div>
                        <div><span>Wind</span><strong>{selectedHour.wind} mph</strong></div>
                        <div><span>Precipitation</span><strong>{selectedHour.precipitation}%</strong></div>
                    </div>
                </div>
                <div className={styles.selectedScore}>
                    <span className={shared.sectionEyebrow}>CLIMBING SCORE</span>
                    <strong className={styles[getScoreLevel(selectedHour.score)]}>{selectedHour.score}<span>/100</span></strong>
                </div>
            </div>

            <div className={styles.factorSection}>
                <div className={styles.factorHeading}>
                    <h3>Score factors</h3>
                    <span>Impact by condition</span>
                </div>
                <div className={styles.factorGrid}>
                    {scoreFactors.map(factor => {
                        const score = selectedHour.factors[factor.key];

                        return (
                            <div className={styles.factor} key={factor.key}>
                                <div className={styles.factorLabel}>
                                    <span>{factor.label}</span>
                                    <strong>{score}<small>/100</small></strong>
                                </div>
                                <div className={styles.factorTrack}>
                                    <span
                                        className={`${styles.factorFill} ${styles[factor.color]}`}
                                        style={{ width: `${score}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}