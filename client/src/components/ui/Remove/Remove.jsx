import styles from './Remove.module.css';
import { useState } from 'react';

export default function Remove({
    onConfirm,
    onClose,
    title,
    description,
    confirmLabel,
}) {
    const [pending, setPending] = useState(false);

    const handleConfirm = async () => {
        setPending(true);
        try {
            await onConfirm();
        } finally {
            setPending(false);
            onClose();
        }
    };

    return (
        <div className={styles.overlay}>
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className={styles.modal}
            >
                <div className={styles.content}>
                    <span className={styles.icon} aria-hidden="true">!</span>
                    <h2>{title}</h2>
                    <p>{description}</p>

                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.cancel}
                            onClick={onClose}
                            disabled={pending}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className={styles.confirm}
                            onClick={handleConfirm}
                            disabled={pending}
                            aria-busy={pending}
                        >
                            {pending && <span className="button-spinner" aria-hidden="true" />}
                            {confirmLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}