import styles from "./Register.module.css";
import { Link } from 'react-router';
import { useState } from 'react';
import { registerSchema } from '../../../schemas/user.schema';
import { useUser } from '../../../hooks/useUser';
import { useNavigate } from "react-router";

export default function Register() {
    const { register, loading } = useUser();
    const [data, setData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(data);
        navigate('/');
    };

    return (
        <section className={styles.page}>
            <div className={styles.panel}>
                <p className={styles.eyebrow}>Start planning your next climb</p>
                <h1>Create an account</h1>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <label htmlFor="register-email">Email</label>
                    <input
                        id="register-email"
                        name="email"
                        autoComplete="email"
                        value={data.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                    />

                    <label htmlFor="register-password">Password</label>
                    <input
                        id="register-password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        value={data.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                    />

                    <label htmlFor="register-confirm-password">Confirm password</label>
                    <input
                        id="register-confirm-password"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        value={data.confirmPassword}
                        onChange={handleChange}
                        placeholder="Enter your password again"
                    />

                    <button type="submit" disabled={loading} aria-busy={loading}>
                        {loading && <span className="button-spinner" aria-hidden="true" />}
                        {loading ? 'Creating account...' : 'Create account'}
                    </button>
                </form>

                <p className={styles.switchForm}>
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </section>
    );
}