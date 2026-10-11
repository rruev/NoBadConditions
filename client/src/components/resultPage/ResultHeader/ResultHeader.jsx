import styles from './ResultHeader.module.css';

export default function ResultHeader({
    name,
    location
}) {
    return (
        <header className={styles.pageHeader}>
            <div>
                <p className={styles.eyebrow}>CRAG CONDITIONS</p>
                <h1>{name}</h1>
                <p className={styles.location}>{location} <span aria-hidden="true">·</span> Today, {new Date().toLocaleDateString()}</p>
            </div>
            <div className={styles.forecastRange}>
                <span className={styles.liveDot} />
                <span>24-hour outlook</span>
                <span className={styles.rangeDivider} />
                <span>00:00 – 23:00</span>
            </div>
        </header>
    );
}