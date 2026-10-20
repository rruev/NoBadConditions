import styles from './ActiveCragSkeleton.module.css';

export default function ActiveCragSkeleton() {
    return (
        <ul className={styles.grid} role="status" aria-label="Loading active crags">
            {Array.from({ length: 3 }, (_, index) => (
                <li key={index} className={styles.card} aria-hidden="true">
                    <div className={styles.cardHeader}>
                        <span className={`${styles.shimmer} ${styles.name}`} />
                        <span className={`${styles.shimmer} ${styles.remove}`} />
                    </div>

                    <div className={styles.stats}>
                        <span className={`${styles.shimmer} ${styles.stat}`} />
                        <span className={`${styles.shimmer} ${styles.stat}`} />
                    </div>

                    <div className={styles.chart}>
                        {Array.from({ length: 12 }, (_, bar) => (
                            <span
                                key={bar}
                                className={`${styles.shimmer} ${styles.bar}`}
                                style={{ height: `${35 + ((bar * 37) % 55)}%` }}
                            />
                        ))}
                    </div>
                </li>
            ))}
        </ul>
    );
}