import styles from "./CurrentWeather.module.css";

export default function CurrentWeather() {
    return (
        <>
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
        </>
    );
}