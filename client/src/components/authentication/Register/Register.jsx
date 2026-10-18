import styles from "./Register.module.css";
import { Link } from 'react-router';

export default function Register() {
    return (
        <section className={styles.page}>
            <div className={styles.panel}>
                <p className={styles.eyebrow}>Start planning your next climb</p>
                <h1>Create an account</h1>

                <form className={styles.form}>
                    <label htmlFor="register-email">Email</label>
                    <input
                        id="register-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                    />

                    <label htmlFor="register-password">Password</label>
                    <input
                        id="register-password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Create a password"
                    />

                    <label htmlFor="register-confirm-password">Confirm password</label>
                    <input
                        id="register-confirm-password"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Enter your password again"
                    />

                    <button type="button">Create account</button>
                </form>

                <p className={styles.switchForm}>
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </section>
    );
}