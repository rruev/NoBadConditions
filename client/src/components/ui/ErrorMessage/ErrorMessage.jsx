import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ error }) {
    return (
        <div className={styles.error} >
            <span className={styles.icon} aria-hidden="true">!</span>
            <p className={styles.message}>
                {error.general ? error.error : 'Unexpected error occurred'}
            </p>
        </div>
    );
}