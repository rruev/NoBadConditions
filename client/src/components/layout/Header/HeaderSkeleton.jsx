import styles from "./Header.module.css";

export default function HeaderSkeleton() {
    return (
        <div className={styles.headerSkeleton} role="status" aria-label="Loading navigation">
            <span className={styles.skeletonLink} />
            <span className={styles.skeletonLink} />
            <span className={styles.skeletonAction} />
        </div>
    );
}