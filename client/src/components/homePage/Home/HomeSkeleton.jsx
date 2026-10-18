import styles from "./Home.module.css";

export default function HomeSkeleton() {
    return (
        <div className={styles.skeletonPage} role="status" aria-label="Loading home page">
            <section className={styles.heroSkeleton} aria-hidden="true">
                <div className={styles.heroCopy}>
                    <span className={`${styles.shimmer} ${styles.eyebrow}`} />
                    <span className={`${styles.shimmer} ${styles.headline}`} />
                    <span className={`${styles.shimmer} ${styles.headlineShort}`} />
                    <span className={`${styles.shimmer} ${styles.description}`} />
                    <span className={`${styles.shimmer} ${styles.descriptionShort}`} />
                </div>
            </section>

            <section className={styles.searchSkeleton} aria-hidden="true">
                <div className={styles.modeSkeleton}>
                    <span className={styles.shimmer} />
                    <span className={styles.shimmer} />
                </div>
                <span className={`${styles.shimmer} ${styles.fieldLabel}`} />
                <span className={`${styles.shimmer} ${styles.field}`} />
                <span className={`${styles.shimmer} ${styles.map}`} />
                <span className={`${styles.shimmer} ${styles.action}`} />
            </section>

            <section className={styles.featuresSkeleton} aria-hidden="true">
                {Array.from({ length: 4 }, (_, index) => (
                    <div className={styles.featureSkeleton} key={index}>
                        <span className={`${styles.shimmer} ${styles.featureIcon}`} />
                        <span className={`${styles.shimmer} ${styles.featureTitle}`} />
                        <span className={`${styles.shimmer} ${styles.featureText}`} />
                        <span className={`${styles.shimmer} ${styles.featureTextShort}`} />
                    </div>
                ))}
            </section>
        </div>
    );
}