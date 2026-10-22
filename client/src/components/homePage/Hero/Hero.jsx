import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>

            <div className={styles.content}>

                <div className={styles.copy}>

                    <span className={styles.eyebrow}>
                        Climbing conditions
                    </span>

                    <h1 className={styles.title}>
                        "There is no bad conditions, only weakness."<br />
                        - Alex Megos
                    </h1>

                </div>

            </div>

        </section>
    );
}
