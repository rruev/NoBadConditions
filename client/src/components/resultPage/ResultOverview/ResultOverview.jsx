import styles from "./ResultOverview.module.css";
import shared from "../../../styles/shared.module.css";
import CurrentWeather from "../CurrentWeather/CurrentWeather";

export default function ResultOverview({ bestHour, averageScore }) {
    return (
        <section className={styles.overview} aria-label="Current weather and 12-hour scores">
            <div className={styles.currentWeather} >
                <p className={shared.sectionEyebrow}>CURRENT WEATHER <span>·</span> 10:15 AM</p>
                <CurrentWeather />
            </div>
            

            <div className={styles.scoreOverview}>
                <div className={styles.scoreMetric} >
                    <p className={shared.sectionEyebrow}>BEST WINDOW</p>
                    <div className={`${styles.metricValue} ${styles.excellentText}`}>
                        {bestHour.score}<span>/100</span>
                    </div>
                    <strong>{bestHour.time}</strong>
                    <span className={styles.metricNote}>Excellent conditions</span>
                </div>
                <div className={styles.metricDivider} />
                <div className={styles.scoreMetric} >
                    <p className={shared.sectionEyebrow}>12-HOUR AVERAGE</p>
                    <div className={`${styles.metricValue} ${styles.averageText}`}>
                        {averageScore}<span>/100</span>
                    </div>
                    <strong>Today</strong>
                    <span className={styles.metricNote}>08:00–19:00 climbing window</span>
                </div>
            </div>
        </section >
    );
}