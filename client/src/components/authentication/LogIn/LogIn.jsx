import styles from "./LogIn.module.css";
import { Link } from 'react-router';
import { useUser } from '../../../hooks/useUser';
import { useState } from "react";
import { useNavigate } from "react-router";

export default function LogIn() {
    const { login, error, loading } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await login({ email, password });

        if (user) {
            navigate('/');
        }
    };

    return (
        <section className={styles.page}>
            <div className={styles.panel}>
                <p className={styles.eyebrow}>Welcome back</p>
                <h1>Log in</h1>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <label htmlFor="login-email">Email</label>
                    <input
                        id="login-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="login-password">Password</label>
                    <input
                        id="login-password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" disabled={loading} aria-busy={loading}>
                        {loading && <span className="button-spinner" aria-hidden="true" />}
                        {loading ? 'Logging in...' : 'Log in'}
                    </button>
                </form>

                <p className={styles.switchForm}>
                    New to NoBadConditions? <Link to="/register">Create an account</Link>
                </p>
            </div>
        </section>
    );
}