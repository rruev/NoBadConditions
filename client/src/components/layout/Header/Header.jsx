import styles from "./Header.module.css";
import { useUser } from '../../../hooks/useUser.js';
import { Link } from 'react-router';
import { useState } from 'react';
import HeaderSkeleton from './HeaderSkeleton.jsx';

export default function Header() {
    const { user, logout, userLoading } = useUser();
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    const clickHandler = async () => {
        closeMenu();
        await logout();
    }

    return (
        <header className={styles.header}>

            <div className={styles.nav}>

                <Link to="/" className={styles.brand}>
                    <span className={styles['brand-mark']}></span>
                    NoBadConditions
                </Link>

                {userLoading ? (
                    <HeaderSkeleton />
                ) : (
                    <>
                        <button
                            type="button"
                            className={styles.mobileToggle}
                            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                            aria-expanded={menuOpen}
                            aria-controls="primary-navigation"
                            onClick={() => setMenuOpen(open => !open)}
                        >
                            <span className={menuOpen ? styles.menuIconOpen : styles.menuIcon} aria-hidden="true">
                                <span />
                                <span />
                                <span />
                            </span>
                        </button>

                        <nav
                            id="primary-navigation"
                            className={`${styles.links} ${menuOpen ? styles.mobileOpen : ''}`}
                        >
                            <Link to="/" className={styles.link} onClick={closeMenu}>Home</Link>
                            {user ? (
                                <>
                                    <Link to="/activecrags" className={styles.link} onClick={closeMenu}>ActiveCrags</Link>
                                    <Link to="/mycrags" className={styles.link} onClick={closeMenu}>MyCrags</Link>
                                    <details className={styles.userMenu}>
                                        <summary className={styles.userButton} aria-label="Open account menu">
                                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                                <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 8a7 7 0 0 0-14 0" />
                                            </svg>
                                        </summary>
                                        <div className={styles.accountMenu}>
                                            <span className={styles.menuHeading}>{user.email}</span>
                                            <button type="button" className={styles.menuOption}>Profile</button>
                                            <button type="button" className={styles.menuOption}>Settings</button>
                                            <button type="button" className={styles.logoutButton} onClick={clickHandler}>
                                                Log out
                                            </button>
                                        </div>
                                    </details>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className={`${styles.link} ${styles['login-button']}`} onClick={closeMenu}>
                                        Log in
                                    </Link>
                                    <Link to="/register" className={`${styles.link} ${styles['register-button']}`} onClick={closeMenu}>
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </>
                )}

            </div>

        </header>
    );
}
