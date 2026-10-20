import styles from './ResultSkeleton.module.css';

export default function ResultSkeleton() {
    return (
        <div className={styles.page} role="status" aria-label="Loading result page">
            <div className={styles.content} aria-hidden="true">
                <span className={`${styles.shimmer} ${styles.backLink}`} />

                <section className={styles.header}>
                    <div className={styles.headerCopy}>
                        <span className={`${styles.shimmer} ${styles.eyebrow}`} />
                        <span className={`${styles.shimmer} ${styles.title}`} />
                        <span className={`${styles.shimmer} ${styles.location}`} />
                    </div>
                    <span className={`${styles.shimmer} ${styles.range}`} />
                </section>

                <section className={styles.overview}>
                    <span className={`${styles.shimmer} ${styles.overviewTop}`} />
                    <span className={`${styles.shimmer} ${styles.overviewBottom}`} />
                </section>

                <section className={styles.scoreOverview}>
                    <div className={styles.metric}>
                        <span className={`${styles.shimmer} ${styles.metricValue}`} />
                        <span className={`${styles.shimmer} ${styles.metricLabel}`} />
                    </div>
                    <span className={styles.metricDivider} />
                    <div className={styles.metric}>
                        <span className={`${styles.shimmer} ${styles.metricValue}`} />
                        <span className={`${styles.shimmer} ${styles.metricLabel}`} />
                    </div>
                </section>

                <section className={styles.chartSection}>
                    <div className={styles.chartHeader}>
                        <span className={`${styles.shimmer} ${styles.chartTitle}`} />
                        <span className={`${styles.shimmer} ${styles.chartLegend}`} />
                    </div>
                    <div className={styles.chart}>
                        {Array.from({ length: 24 }, (_, index) => (
                            <span
                                key={index}
                                className={`${styles.shimmer} ${styles.bar}`}
                                style={{ height: `${25 + ((index * 17) % 70)}%` }}
                            />
                        ))}
                    </div>
                </section>

                <section className={styles.details}>
                    <span className={`${styles.shimmer} ${styles.detailsTitle}`} />
                    <span className={`${styles.shimmer} ${styles.detailsSummary}`} />
                    <div className={styles.factors}>
                        {Array.from({ length: 4 }, (_, index) => (
                            <div key={index} className={styles.factor}>
                                <span className={`${styles.shimmer} ${styles.factorTitle}`} />
                                <span className={`${styles.shimmer} ${styles.factorTrack}`} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}