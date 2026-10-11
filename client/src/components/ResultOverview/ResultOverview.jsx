export default function ResultOverview() {
    return (
        <section className={styles.overview} aria-label="Current weather and 12-hour scores">
            <div className={styles.currentWeather}>
                <p className={styles.sectionEyebrow}>CURRENT WEATHER <span>·</span> 10:15 AM</p>
                <div className={styles.currentCondition}>
                    <span className={styles.sunIcon} aria-hidden="true">☼</span>
                    <span className={styles.currentTemperature}>68<span>°</span></span>
                    <div className={styles.conditionText}>
                        <strong>Mostly sunny</strong>
                        <span>Feels like 67°</span>
                    </div>
                </div>
                <div className={styles.weatherStats}>
                    <div><span>Wind</span><strong>5 <small>mph</small></strong></div>
                    <div><span>Humidity</span><strong>38<small>%</small></strong></div>
                    <div><span>Precip.</span><strong>0<small>%</small></strong></div>
                </div>
            </div>

            <div className={styles.scoreOverview}>
                <div className={styles.scoreMetric}>
                    <span className={styles.sectionEyebrow}>BEST WINDOW</span>
                    <div className={`${styles.metricValue} ${styles.excellentText}`}>
                        {bestHour.score}<span>/100</span>
                    </div>
                    <strong>{bestHour.time}</strong>
                    <span className={styles.metricNote}>Excellent conditions</span>
                </div>
                <div className={styles.metricDivider} />
                <div className={styles.scoreMetric}>
                    <span className={styles.sectionEyebrow}>12-HOUR AVERAGE</span>
                    <div className={`${styles.metricValue} ${styles.averageText}`}>
                        {averageScore}<span>/100</span>
                    </div>
                    <strong>Today</strong>
                    <span className={styles.metricNote}>08:00–19:00 climbing window</span>
                </div>
            </div>
        </section>
    );
}