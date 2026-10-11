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
                        Better conditions.<br />
                        Better climbing.
                    </h1>

                    <p>
                        Find the best time to climb based on temperature,
                        humidity, precipitation, wind and other conditions
                        at the crag.
                    </p>

                </div>

            </div>

        </section>
    );
}
