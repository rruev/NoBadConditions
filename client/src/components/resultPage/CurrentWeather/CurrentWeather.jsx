import styles from "./CurrentWeather.module.css";

export default function CurrentWeather({ currentWeather }) {
    return (
        <>
            <div className={styles.currentCondition}>
                <span className={styles.sunIcon} aria-hidden="true">☼</span>
                <span className={styles.currentTemperature}>{currentWeather.temperature_2m}<span>°</span></span>
                <div className={styles.conditionText}>
                    <strong>Mostly sunny</strong>
                    <span>Feels like {currentWeather.apparent_temperature}<span>°</span></span>
                </div>
            </div>
            <div className={styles.weatherStats}>
                <div><span>Wind</span><strong>{currentWeather.wind_speed} <small>mph</small></strong></div>
                <div><span>Humidity</span><strong>{currentWeather.relative_humidity_2m}<small>%</small></strong></div>
                <div><span>Precip.</span><strong>{currentWeather.precipitation}<small>%</small></strong></div>
            </div>
        </>
    );
}