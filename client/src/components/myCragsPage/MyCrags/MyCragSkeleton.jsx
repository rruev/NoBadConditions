import styles from './MyCragSkeleton.module.css';

export default function MyCragSkeleton() {
    return (
        <section className={styles.page} role="status" aria-label="Loading your crags">
            <div className={styles.container} aria-hidden="true">
                <header className={styles.heading}>
                    <div className={styles.headingCopy}>
                        <span className={`${styles.shimmer} ${styles.eyebrow}`} />
                        <span className={`${styles.shimmer} ${styles.title}`} />
                    </div>
                    <span className={`${styles.shimmer} ${styles.addButton}`} />
                </header>

                <ul className={styles.grid}>
                    {Array.from({ length: 6 }, (_, index) => (
                        <li key={index} className={styles.card}>
                            <div className={styles.cardMain}>
                                <span className={`${styles.shimmer} ${styles.marker}`} />
                                <span className={`${styles.shimmer} ${styles.name}`} />
                                <span className={`${styles.shimmer} ${styles.region}`} />
                                <div className={styles.meta}>
                                    <span className={`${styles.shimmer} ${styles.metaItem}`} />
                                    <span className={`${styles.shimmer} ${styles.metaItem}`} />
                                </div>
                            </div>
                            <div className={styles.actions}>
                                <span className={`${styles.shimmer} ${styles.action}`} />
                                <span className={`${styles.shimmer} ${styles.action}`} />
                                <span className={`${styles.shimmer} ${styles.action}`} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}