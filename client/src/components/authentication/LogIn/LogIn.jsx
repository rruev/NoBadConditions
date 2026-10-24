import styles from "./LogIn.module.css";
import sharedStyles from '../../../styles/shared.module.css';
import { Link } from 'react-router';
import { useUser } from '../../../hooks/useUser';
import { useState, useEffect } from "react";
import SubmitButton from '../../ui/SubmitButton/SubmitButton';

export default function LogIn() {
    const { login, error, clearError } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    useEffect(() => {
        clearError();
    }, [clearError]);

    const handleSubmit = async () => {
         await login({ email, password });
    };

    return (
        <section className={styles.page}>
            <div className={styles.panel}>
                <p className={styles.eyebrow}>Welcome back</p>
                <h1>Log in</h1>

                <form className={styles.form} action={handleSubmit}>
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
                    {error && error.email && <p className={sharedStyles.error}>{error.email}</p>}

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
                    {error && error.password && <p className={sharedStyles.error}>{error.password}</p>}

                    <SubmitButton type="login" />
                    {error && error.general && <p className={sharedStyles.error}>{error.general}</p>}
                </form>

                <p className={styles.switchForm}>
                    New to NoBadConditions? <Link to="/register">Create an account</Link>
                </p>
            </div>
        </section>
    );
}