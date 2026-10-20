import styles from './Remove.module.css';
import { useId, useRef, useState } from 'react';

export default function Remove({
    onConfirm,
    children = 'Remove',
    title = 'Are you sure?',
    description = 'This action cannot be undone.',
    confirmLabel = 'Remove',
    cancelLabel = 'Cancel',
    className,
    disabled = false
}) {
    const dialogRef = useRef(null);
    const id = useId();
    const [pending, setPending] = useState(false);

    const open = () => dialogRef.current?.showModal();
    const close = () => dialogRef.current?.close();

    const handleConfirm = async () => {
        setPending(true);
        try {
            await onConfirm?.();
            close();
        } finally {
            setPending(false);
        }
    };

    // A click on the backdrop targets the dialog element itself.
    const handleBackdropClick = (e) => {
        if (e.target === dialogRef.current && !pending) {
            close();
        }
    };

    return (
        <>
            <button
                type="button"
                className={className ?? styles.trigger}
                disabled={disabled}
                onClick={open}
            >
                {children}
            </button>

            <dialog
                ref={dialogRef}
                className={styles.dialog}
                onClick={handleBackdropClick}
                onCancel={(e) => pending && e.preventDefault()}
                aria-labelledby={`${id}-title`}
                aria-describedby={`${id}-description`}
            >
                <div className={styles.content}>
                    <span className={styles.icon} aria-hidden="true">!</span>
                    <h2 id={`${id}-title`}>{title}</h2>
                    <p id={`${id}-description`}>{description}</p>

                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.cancel}
                            onClick={close}
                            disabled={pending}
                        >
                            {cancelLabel}
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
            </dialog>
        </>
    );
}