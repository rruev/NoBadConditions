import styles from './SubmitButton.module.css';
import { useFormStatus } from 'react-dom';

const buttons = {
    add: {
        label: 'Add to MyCrags',
        pendingLabel: 'Adding...'
    },
    edit: {
        label: 'Save changes',
        pendingLabel: 'Saving...'
    },
    register: {
        label: 'Register',
        pendingLabel: 'Registering...'
    },
    login: {
        label: 'Login',
        pendingLabel: 'Logging in...'
    }
}

export default function SubmitButton({ type, disabled }) {
    const { pending } = useFormStatus();
    return (
        <button className={styles.submitButton} disabled={pending || disabled} aria-busy={pending}>
            {pending && <span className="button-spinner" aria-hidden="true"></span>}
            {pending ? buttons[type].pendingLabel : buttons[type].label}
        </button>
    );
}