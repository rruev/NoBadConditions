import styles from "./Register.module.css";
import sharedStyles from '../../../styles/shared.module.css';
import { registerSchema } from '../../../schemas/user.schema';
import { Link } from 'react-router';
import { useEffect } from 'react';
import { useState } from 'react';
import { useUser } from '../../../hooks/useUser';
import { useNavigate } from "react-router";
import useValidate from '../../../hooks/useValidate';
import SubmitButton from '../../ui/SubmitButton/SubmitButton';

export default function Register() {
    const { register, error: serverError, clearError } = useUser();
    const { validateInput, error, touched } = useValidate(registerSchema);
    const [data, setData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();
    
    useEffect(() => {
        clearError();
    }, [clearError]);

    const errorMessage = (field) => {
        if (touched[field] && error && error[field] ) {
            return <p className={sharedStyles.error}>{error[field]}</p>
        } else if (serverError && serverError[field]) {
            return <p className={sharedStyles.error}>{serverError[field]}</p>
        }
        return null;
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const handleBlur = async (e) => {
        await validateInput(e, data);
    }

    const handleSubmit = async () => {
        const user = await register(data);
        if (user) {
            navigate('/');
        }
    };

    return (
        <section className={styles.page}>
            <div className={styles.panel}>
                <p className={styles.eyebrow}>Start planning your next climb</p>
                <h1>Create an account</h1>

                <form className={styles.form} action={handleSubmit}>
                    <label htmlFor="register-email">Email</label>
                    <input
                        id="register-email"
                        className={error && error.email && sharedStyles.inputError}
                        name="email"
                        autoComplete="email"
                        value={data.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="you@example.com"
                    />
                    {errorMessage('email')}

                    <label htmlFor="register-password">Password</label>
                    <input
                        id="register-password"
                        className={error && error.password && sharedStyles.inputError}
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        value={data.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Create a password"
                    />
                    {errorMessage('password')}

                    <label htmlFor="register-confirm-password">Confirm password</label>
                    <input
                        id="register-confirm-password"
                        className={error && error.confirmPassword && sharedStyles.inputError}
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        value={data.confirmPassword}
                        onChange={handleChange}
                        onInput={handleBlur}
                        placeholder="Enter your password again"
                    />
                    {errorMessage('confirmPassword')}

                    <SubmitButton type="register" disabled={error} />
                    {serverError && serverError.general && <p className={sharedStyles.error}>{serverError.general}</p>}
                </form>

                <p className={styles.switchForm}>
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </section>
    );
}