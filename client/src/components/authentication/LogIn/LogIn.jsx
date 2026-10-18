import styles from "./LogIn.module.css";
import { Link } from 'react-router';

export default function LogIn() {
    return (
        <section className={styles.page}>
            <div className={styles.panel}>
                <p className={styles.eyebrow}>Welcome back</p>
                <h1>Log in</h1>

                <form className={styles.form}>
                    <label htmlFor="login-email">Email</label>
                    <input
                        id="login-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                    />

                    <label htmlFor="login-password">Password</label>
                    <input
                        id="login-password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                    />

                    <button type="button">Log in</button>
                </form>

                <p className={styles.switchForm}>
                    New to NoBadConditions? <Link to="/register">Create an account</Link>
                </p>
            </div>
        </section>
    );
}