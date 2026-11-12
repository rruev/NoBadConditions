import styles from "./DailyCard.module.css";

export default function DailyCard({
    date,
    cloudCoverMean,
    tempMin,
    tempMax,
    precipitationSum
}) {
    return(
        <article className={`${styles.dailyCard}`}>
            <p className={styles.date}>{date}</p>
            <p className={styles.cloudCover}>
                {cloudCoverMean} %
                <span>Cloud Cover</span>
            </p>
            <p className={styles.tempMax}>{tempMax}°</p>
            <p className={styles.tempMin}>{tempMin}°</p>
            <p className={styles.precipitation}>
                {precipitationSum} mm
                <span>Precipitation</span>
            </p>
        </article>
    );
}