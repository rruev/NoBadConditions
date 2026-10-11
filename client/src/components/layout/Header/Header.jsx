import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>

            <div className={styles.nav}>

                <a href="#" className={styles.brand}>
                    <span className={styles['brand-mark']}></span>
                    NoBadConditions
                </a>

                <nav className={styles.links}>
                    <a href="#" className={styles.link}>Home</a>
                    <a href="#" className={styles.link}>Crags</a>
                    <a href="#" className={styles.link}>About</a>
                    <a href="#" className={`${styles.link} ${styles['login-button']}`}>Log in</a>
                </nav>

            </div>

        </header>
    );
}
