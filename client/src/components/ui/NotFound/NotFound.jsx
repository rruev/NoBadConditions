import styles from './NotFound.module.css';
import { Link } from 'react-router';

export default function NotFound() {
    return (
        <section className={styles.page}>
            <div className={styles.panel}>
                <p className={styles.code} aria-hidden="true">404</p>
                <p className={styles.eyebrow}>Page not found</p>
                <h1>Lost in the woods</h1>
                <p className={styles.description}>
                    The page you are looking for does not exist or has been moved.
                </p>

                <div className={styles.actions}>
                    <Link to="/" className={styles.primary}>Back to home</Link>
                    <Link to="/mycrags" className={styles.secondary}>My crags</Link>
                </div>
            </div>
        </section>
    );
}